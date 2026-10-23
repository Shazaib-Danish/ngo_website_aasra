import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

// Shared with the Aasra mobile app, which reads these collections.
const firebaseConfig = {
  apiKey: 'AIzaSyDPp5a-deaJK8huVH8s0H-9mfa2aQHKIF8',
  authDomain: 'aasra-app-b339a.firebaseapp.com',
  projectId: 'aasra-app-b339a',
  storageBucket: 'aasra-app-b339a.firebasestorage.app',
  messagingSenderId: '826487743769',
  appId: '1:826487743769:web:e90bc0e8820461430c9188',
  measurementId: 'G-T8PY6QX4GY',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics is unavailable in some browsers (e.g. blocked cookies); never let it break the page.
isSupported()
  .then((ok) => ok && getAnalytics(app))
  .catch(() => {});

export const COLLECTIONS = {
  contactMessages: 'contact_messages',
  volunteers: 'volunteers',
} as const;

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  language?: string;
}

export interface VolunteerInput {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  skills: string[];
  additionalInfo?: string;
  language?: string;
}

// Drop empty optional fields so documents stay clean for the app.
const compact = <T extends object>(data: T) =>
  Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && v !== '')) as Partial<T>;

const submit = (name: string, data: object) =>
  addDoc(collection(db, name), {
    ...compact(data),
    status: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
  });

export const submitContactMessage = (data: ContactMessageInput) => submit(COLLECTIONS.contactMessages, data);

export const submitVolunteer = (data: VolunteerInput) => submit(COLLECTIONS.volunteers, data);
