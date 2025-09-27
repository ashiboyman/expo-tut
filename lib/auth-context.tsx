import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        setIsLoadingUser(true);
        try{
            const user = await account.get();
            setUser(user);
        }catch(error){
            setUser(null);
        }finally{
            setIsLoadingUser(false);
        }
    }

    
    const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            await signIn(email, password);
            return null;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign up";
        }
    };
    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            return null;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign in";
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                isLoadingUser,
                signUp,
                signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context || context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
