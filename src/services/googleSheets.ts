import { RSVPData } from '@/types/rsvp';

export interface GuestData {
  id: string;
  name: string;
  whatsapp: string;
  relation?: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '';

// Check if we are connected to Google Sheets
export const isSheetsConfigured = (): boolean => {
  return API_URL !== '';
};

// Integrasi RSVP dengan Google Spreadsheets via Google Apps Script
export const submitRSVP = async (data: RSVPData): Promise<boolean> => {
  try {
    console.log('Submitting RSVP:', data);
    
    if (!API_URL) {
      console.warn('VITE_GOOGLE_SHEETS_API_URL tidak ditemukan. Menggunakan fallback simulasi.');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Save local RSVP to simulate
      const localRSVPs = JSON.parse(localStorage.getItem('local_rsvps') || '[]');
      localRSVPs.unshift({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem('local_rsvps', JSON.stringify(localRSVPs));
      return true;
    }
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('RSVP submission error, using local fallback:', error);
    // Fallback to local storage for simulation
    const localRSVPs = JSON.parse(localStorage.getItem('local_rsvps') || '[]');
    localRSVPs.unshift({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem('local_rsvps', JSON.stringify(localRSVPs));
    return true; // Return true so UI doesn't crash, but log error
  }
};

export const fetchWishes = async () => {
  try {
    if (!API_URL) {
      console.warn('VITE_GOOGLE_SHEETS_API_URL tidak ditemukan. Menggunakan fallback local wishes.');
      const localRSVPs = JSON.parse(localStorage.getItem('local_rsvps') || '[]');
      const defaultWishes = [
        {
          name: 'Andi & Budi',
          message: 'Selamat ya Bagus & Icha! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: 'Hadir',
        },
        {
          name: 'Siti Aminah',
          message: 'Barakallah! Senang sekali melihat kalian akhirnya menikah. Semoga dilancarkan sampai hari H.',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          status: 'Hadir',
        },
        {
          name: 'Keluarga Besar Wijaya',
          message: 'Semoga cinta kalian abadi selamanya dan dikaruniai keturunan yang sholeh/sholehah.',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: 'Mungkin Hadir',
        },
      ];
      // Merge local RSVPs that have messages
      const activeLocalWishes = localRSVPs
        .filter((r: any) => r.message && r.message.trim() !== '')
        .map((r: any) => ({
          name: r.name,
          message: r.message,
          createdAt: r.createdAt || new Date().toISOString(),
          status: r.status || 'Hadir',
        }));
      return [...activeLocalWishes, ...defaultWishes];
    }
    
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching wishes, using local fallback:', error);
    const localRSVPs = JSON.parse(localStorage.getItem('local_rsvps') || '[]');
    const activeLocalWishes = localRSVPs
      .filter((r: any) => r.message && r.message.trim() !== '')
      .map((r: any) => ({
        name: r.name,
        message: r.message,
        createdAt: r.createdAt || new Date().toISOString(),
        status: r.status || 'Hadir',
      }));
    return activeLocalWishes;
  }
};

// ================= GUEST MANAGEMENT (DASHBOARD INTEGRATION) =================

// Fetch Guest List from Google Sheets or LocalStorage fallback
export const fetchGuests = async (): Promise<GuestData[]> => {
  if (!API_URL) {
    return getLocalGuests();
  }
  
  try {
    const response = await fetch(`${API_URL}?action=getGuests`);
    if (!response.ok) {
      throw new Error('Failed to fetch from Google Sheets API');
    }
    const data = await response.json();
    if (data && Array.isArray(data.guests)) {
      // Sync local storage with Google Sheets data
      localStorage.setItem('wedding_guests', JSON.stringify(data.guests));
      return data.guests;
    }
    
    // If google sheet returns empty or error format, check local storage
    return getLocalGuests();
  } catch (error) {
    console.error('Error fetching guests from Sheets, using local storage:', error);
    return getLocalGuests();
  }
};

// Add Guest to Google Sheets and LocalStorage
export const addGuest = async (name: string, whatsapp: string, relation: string = 'Teman'): Promise<{ success: boolean; guest?: GuestData }> => {
  const newGuest: GuestData = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    whatsapp,
    relation,
    createdAt: new Date().toISOString()
  };

  // Always save locally first
  const localGuests = getLocalGuests();
  localGuests.unshift(newGuest);
  localStorage.setItem('wedding_guests', JSON.stringify(localGuests));

  if (!API_URL) {
    return { success: true, guest: newGuest };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'addGuest',
        ...newGuest
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync guest with Google Sheets');
    }

    const result = await response.json();
    if (result.success) {
      return { success: true, guest: newGuest };
    }
    return { success: false, guest: newGuest };
  } catch (error) {
    console.error('Error syncing new guest with Google Sheets, saved locally:', error);
    return { success: true, guest: newGuest }; // return true since it's saved locally
  }
};

// Delete Guest from Google Sheets and LocalStorage
export const deleteGuest = async (id: string, name: string): Promise<boolean> => {
  // Update local storage first
  const localGuests = getLocalGuests();
  const filteredGuests = localGuests.filter(g => g.id !== id && g.name !== name);
  localStorage.setItem('wedding_guests', JSON.stringify(filteredGuests));

  if (!API_URL) {
    return true;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'deleteGuest',
        id,
        name
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete guest on Google Sheets');
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error deleting guest from Google Sheets, removed locally:', error);
    return true; // return true since it was successfully deleted locally
  }
};

// Helper for local storage
const getLocalGuests = (): GuestData[] => {
  const data = localStorage.getItem('wedding_guests');
  if (!data) {
    // Return sample guests initially
    const samples: GuestData[] = [
      { id: '1', name: 'Jokowi', whatsapp: '08123456789', relation: 'VVIP', createdAt: new Date().toISOString() },
      { id: '2', name: 'Raffi Ahmad', whatsapp: '08987654321', relation: 'Artis', createdAt: new Date().toISOString() },
      { id: '3', name: 'Prabowo Subianto', whatsapp: '082233445566', relation: 'Keluarga', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('wedding_guests', JSON.stringify(samples));
    return samples;
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};
