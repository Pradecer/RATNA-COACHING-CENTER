import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  classLevel: string;
  schoolName: string;
  rollNumber: string;
  joinedDate: string;
  score: {
    correct: number;
    attempted: number;
  };
}

interface AuthContextType {
  student: Student | null;
  isAdmin: boolean;
  loading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  registerStudent: (name: string, email: string, phone: string, classLevel: string, schoolName: string, passwordField: string) => Promise<{ success: boolean; error?: string }>;
  loginStudent: (email: string, passwordField: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (usernameField: string, passwordField: string) => Promise<{ success: boolean; error?: string }>;
  updateStudentProfile: (name: string, phone: string, schoolName: string, classLevel: string) => void;
  updateStudentScore: (correctDelta: number, attemptedDelta: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'ratna_student_accounts';
const CURRENT_USER_KEY = 'ratna_current_student';
const ADMIN_LOGGED_KEY = 'ratna_admin_logged';

// Helper to hash string to SHA-256 hex
const hashString = async (text: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync state with storage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      let activeStudent: Student | null = null;
      if (storedUser) {
        activeStudent = JSON.parse(storedUser);
        setStudent(activeStudent);
      }
      
      const adminLogged = sessionStorage.getItem(ADMIN_LOGGED_KEY) === 'true';
      setIsAdmin(adminLogged);

      // Automatically pop up login modal on website load if no one is logged in
      if (!activeStudent && !adminLogged) {
        setIsLoginModalOpen(true);
      }
    } catch (e) {
      console.error('Error parsing stored auth data', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const registerStudent = async (
    name: string,
    email: string,
    phone: string,
    classLevel: string,
    schoolName: string,
    passwordField: string
  ) => {
    try {
      const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersStr ? JSON.parse(usersStr) : [];

      const emailLower = email.toLowerCase().trim();
      if (users.some((u: any) => u.email.toLowerCase() === emailLower)) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      // Generate roll number: RATNA-2026-[4-digit-random]
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const rollNumber = `RATNA-2026-${randomId}`;
      const joinedDate = new Date().toISOString().split('T')[0];

      // Cryptographically hash the password before storing in local database
      const hashedPassword = await hashString(passwordField);

      const newStudent: Student = {
        id: `stu-${Date.now()}`,
        name: name.trim(),
        email: emailLower,
        phone: phone.trim(),
        classLevel,
        schoolName: schoolName.trim(),
        rollNumber,
        joinedDate,
        score: { correct: 0, attempted: 0 }
      };

      const newUserAccount = {
        ...newStudent,
        password: hashedPassword
      };

      users.push(newUserAccount);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Set active session
      setStudent(newStudent);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newStudent));
      closeLoginModal();
      
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Registration failed due to a system error.' };
    }
  };

  const loginStudent = async (email: string, passwordField: string) => {
    try {
      const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersStr ? JSON.parse(usersStr) : [];

      const emailLower = email.toLowerCase().trim();
      const hashedPassword = await hashString(passwordField);
      
      const matchedAccount = users.find(
        (u: any) => u.email.toLowerCase() === emailLower && u.password === hashedPassword
      );

      if (!matchedAccount) {
        return { success: false, error: 'Invalid email or password.' };
      }

      // Strip password hash from session state
      const { password, ...studentProfile } = matchedAccount;
      
      setStudent(studentProfile);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(studentProfile));
      closeLoginModal();
      
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Login failed due to a system error.' };
    }
  };

  const loginAdmin = async (usernameField: string, passwordField: string) => {
    try {
      // Hashed credentials to check against:
      // admin: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      // ratna123: 5e313469f0389646496f428938ce1c6d0fea2e71ee29b77bb352e0aaef213119
      const userHash = await hashString(usernameField);
      const passHash = await hashString(passwordField);

      if (
        userHash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' &&
        passHash === '5e313469f0389646496f428938ce1c6d0fea2e71ee29b77bb352e0aaef213119'
      ) {
        setIsAdmin(true);
        sessionStorage.setItem(ADMIN_LOGGED_KEY, 'true');
        closeLoginModal();
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials.' };
    } catch (err) {
      return { success: false, error: 'System error during authentication.' };
    }
  };

  const updateStudentProfile = (name: string, phone: string, schoolName: string, classLevel: string) => {
    if (!student) return;

    const updatedStudent: Student = {
      ...student,
      name: name.trim(),
      phone: phone.trim(),
      schoolName: schoolName.trim(),
      classLevel
    };

    setStudent(updatedStudent);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedStudent));

    try {
      const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map((u: any) => 
          u.id === student.id 
            ? { ...u, name: name.trim(), phone: phone.trim(), schoolName: schoolName.trim(), classLevel } 
            : u
        );
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      }
    } catch (e) {
      console.error('Failed to update student in master storage', e);
    }
  };

  const updateStudentScore = (correctDelta: number, attemptedDelta: number) => {
    if (!student) return;

    const currentScore = student.score || { correct: 0, attempted: 0 };
    const updatedStudent: Student = {
      ...student,
      score: {
        correct: currentScore.correct + correctDelta,
        attempted: currentScore.attempted + attemptedDelta
      }
    };

    setStudent(updatedStudent);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedStudent));

    try {
      const usersStr = localStorage.getItem(USERS_STORAGE_KEY);
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map((u: any) => 
          u.id === student.id 
            ? { ...u, score: updatedStudent.score } 
            : u
        );
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      }
    } catch (e) {
      console.error('Failed to update student score in master storage', e);
    }
  };

  const logout = () => {
    setStudent(null);
    setIsAdmin(false);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(ADMIN_LOGGED_KEY);
    // Re-open login modal when user explicitly logs out
    setIsLoginModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      student,
      isAdmin,
      loading,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      registerStudent,
      loginStudent,
      loginAdmin,
      updateStudentProfile,
      updateStudentScore,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
