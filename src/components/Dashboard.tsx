import { useState, useEffect } from "react";
import { 
  Plus, Trash2, Copy, ExternalLink, Search, Share2, 
  Database, Check, AlertCircle, Users, CheckSquare, 
  MessageSquare, ArrowLeft, Code, RefreshCw, Layers
} from "lucide-react";
import { fetchGuests, addGuest, deleteGuest, fetchWishes, isSheetsConfigured, GuestData } from "@/services/googleSheets";

// Define WhatsApp Template option
interface WATemplate {
  id: string;
  name: string;
  template: string;
}

export default function Dashboard() {
  const [guests, setGuests] = useState<GuestData[]>([]);
  const [wishes, setWishes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'guests' | 'wishes' | 'script'>('guests');
  const [configured, setConfigured] = useState(false);
  
  // Single Guest Input Form
  const [inputName, setInputName] = useState("");
  const [inputWhatsapp, setInputWhatsapp] = useState("");
  const [inputRelation, setInputRelation] = useState("Teman");

  // Bulk Guest Input Form
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkNames, setBulkNames] = useState("");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRelation, setFilterRelation] = useState("Semua");
  
  // Notification states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // WA Templates
  const templates: WATemplate[] = [
    {
      id: "formal",
      name: "Formal (Bahasa Indonesia)",
      template: `Yth. *[Nama Tamu]*,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami, *Bagus & Icha*.

Detail informasi mengenai acara, lokasi peta, dan RSVP dapat diakses melalui tautan undangan digital berikut:
[Link Undangan]

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.

Terima kasih banyak atas perhatiannya.

Salam hangat,
*Bagus & Icha*`
    },
    {
      id: "casual",
      name: "Santai / Teman",
      template: `Halo *[Nama Tamu]*,

Semoga kamu dalam keadaan sehat ya. 

Kami ingin membagikan kabar bahagia ini. Kami, *Bagus & Icha*, akan segera melangsungkan pernikahan kami. Tanpa mengurangi rasa hormat, kami mengundang kamu untuk hadir dan merayakan hari spesial ini bersama kami.

Silakan buka link undangan digital di bawah ini untuk melihat detail acara, lokasi, serta mengisi konfirmasi kehadiran (RSVP):
[Link Undangan]

Kehadiran dan doa restu kamu sangat berarti bagi kami. Sampai jumpa di hari bahagia kami!

Salam,
*Bagus & Icha*`
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string>("formal");

  // Fetch initial data
  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const isConfigured = isSheetsConfigured();
      setConfigured(isConfigured);
      
      const guestList = await fetchGuests();
      setGuests(guestList);
      
      const wishList = await fetchWishes();
      setWishes(wishList);
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal memuat data dari database");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadData().finally(() => setIsLoading(false));
  }, []);

  const showAlert = (type: 'success' | 'error', text: string) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Add Guest logic
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      showAlert("error", "Nama tamu tidak boleh kosong");
      return;
    }

    try {
      setIsLoading(true);
      const res = await addGuest(inputName.trim(), inputWhatsapp.trim(), inputRelation);
      if (res.success && res.guest) {
        setGuests(prev => [res.guest!, ...prev]);
        setInputName("");
        setInputWhatsapp("");
        showAlert("success", `Tamu "${inputName}" berhasil ditambahkan!`);
      } else {
        showAlert("error", "Gagal menambahkan tamu");
      }
    } catch (err) {
      console.error(err);
      showAlert("error", "Error koneksi saat menambahkan tamu");
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk Add Guests logic
  const handleBulkAdd = async () => {
    if (!bulkNames.trim()) {
      showAlert("error", "Nama-nama tamu tidak boleh kosong");
      return;
    }

    const namesArray = bulkNames
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (namesArray.length === 0) {
      showAlert("error", "Format nama-nama tamu tidak valid");
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    
    // Add one by one (to handle both local and sheet API requests)
    for (const name of namesArray) {
      try {
        const res = await addGuest(name, "", "Teman");
        if (res.success && res.guest) {
          setGuests(prev => [res.guest!, ...prev]);
          successCount++;
        }
      } catch (err) {
        console.error("Failed to add bulk item:", name, err);
      }
    }

    setIsLoading(false);
    setBulkNames("");
    setIsBulkOpen(false);
    showAlert("success", `Berhasil menambahkan ${successCount} dari ${namesArray.length} tamu!`);
  };

  // Delete Guest logic
  const handleDeleteGuest = async (id: string, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus tamu "${name}"?`)) {
      return;
    }

    try {
      setIsLoading(true);
      const success = await deleteGuest(id, name);
      if (success) {
        setGuests(prev => prev.filter(g => g.id !== id));
        showAlert("success", `Tamu "${name}" berhasil dihapus`);
      } else {
        showAlert("error", "Gagal menghapus tamu");
      }
    } catch (err) {
      console.error(err);
      showAlert("error", "Error koneksi saat menghapus tamu");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate invitation link
  const getInvitationLink = (name: string) => {
    const origin = window.location.origin;
    return `${origin}/?to=${encodeURIComponent(name)}`;
  };

  // Copy invitation link helper
  const handleCopyLink = (name: string, id: string) => {
    const link = getInvitationLink(name);
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Share via Whatsapp helper
  const handleShareWhatsapp = (guest: GuestData) => {
    const link = getInvitationLink(guest.name);
    const activeTpl = templates.find(t => t.id === selectedTemplate)?.template || templates[0].template;
    
    let message = activeTpl
      .replace("[Nama Tamu]", guest.name)
      .replace("[Link Undangan]", link);
    
    const encodedMessage = encodeURIComponent(message);
    let targetNo = guest.whatsapp.trim();
    
    // Clean phone number format
    if (targetNo) {
      if (targetNo.startsWith("0")) {
        targetNo = "62" + targetNo.substring(1);
      }
      targetNo = targetNo.replace(/[-+ \s]/g, "");
    }
    
    const waUrl = targetNo 
      ? `https://api.whatsapp.com/send?phone=${targetNo}&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?text=${encodedMessage}`;
      
    window.open(waUrl, '_blank');
  };

  // Search filter implementation
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guest.whatsapp.includes(searchQuery);
    const matchesRelation = filterRelation === "Semua" || guest.relation === filterRelation;
    return matchesSearch && matchesRelation;
  });

  // Calculate stats
  const totalGuestsCount = guests.length;
  const totalWishesCount = wishes.length;
  const attendanceStats = wishes.reduce((acc, current) => {
    const status = current.status?.toLowerCase() || '';
    if (status.includes('hadir') && !status.includes('tidak')) {
      acc.hadir += (Number(current.guests) || 1);
    } else if (status.includes('tidak')) {
      acc.tidakHadir += 1;
    } else {
      acc.mungkin += 1;
    }
    return acc;
  }, { hadir: 0, tidakHadir: 0, mungkin: 0 });

  // Google Apps Script source code template for instructions tab
  const getGoogleScriptCode = () => {
    return `// =========================================================================
// GOOGLE APPS SCRIPT UNTUK UNDANGAN PERNIKAHAN DIGITAL (INTEGRASI PENUH)
// =========================================================================
// Cara Setup:
// 1. Buka Google Sheets Anda.
// 2. Klik Extensions -> Apps Script.
// 3. Hapus kode default, lalu salin dan tempel seluruh kode di bawah ini.
// 4. Buat 2 Sheet/Tab baru di Spreadsheet Anda dengan nama:
//    - "RSVP" (Kolom: Nama Tamu, Whatsapp, Jumlah Tamu, Kehadiran, Ucapan, Tanggal Submit)
//    - "TamuUndangan" (Kolom: ID, Nama Tamu, Whatsapp, Relation, Tanggal Ditambah)
// 5. Klik "Deploy" -> "New deployment".
// 6. Pilih tipe "Web app".
// 7. Atur:
//    - Execute as: "Me (email anda)"
//    - Who has access: "Anyone"
// 8. Klik Deploy, setujui perizinan akun Google Anda.
// 9. Salin URL Web App yang dihasilkan dan masukkan ke file .env Anda:
//    VITE_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/xxxx/exec
// =========================================================================

function doGet(e) {
  var action = e.parameter.action;
  
  if (action === "getGuests") {
    return getGuestsData();
  }
  
  // Default action: Mengambil data Ucapan & RSVP
  return getWishesData();
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    
    if (action === "addGuest") {
      return addGuestData(data);
    } else if (action === "deleteGuest") {
      return deleteGuestData(data);
    }
    
    // Default action: Form RSVP undangan dari depan
    return submitRSVPData(data);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// 1. Get RSVP & Wishes
function getWishesData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("RSVP") || doc.getSheets()[0];
  var rows = sheet.getDataRange().getValues();
  var wishes = [];
  
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    wishes.push({
      name: rows[i][0],
      whatsapp: rows[i][1] ? rows[i][1].toString() : "",
      guests: rows[i][2] || 1,
      status: rows[i][3] || "Hadir",
      message: rows[i][4] || "",
      createdAt: rows[i][5] ? rows[i][5].toString() : new Date().toISOString()
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(wishes))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// 2. Submit RSVP
function submitRSVPData(data) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("RSVP") || doc.getSheets()[0];
  
  sheet.appendRow([
    data.name,
    data.whatsapp || "",
    data.guests || 1,
    data.status,
    data.message || "",
    new Date()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// 3. Get Guests List
function getGuestsData() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("TamuUndangan");
  
  // Jika sheet belum ada, otomatis buat
  if (!sheet) {
    sheet = doc.insertSheet("TamuUndangan");
    sheet.appendRow(["ID", "Nama Tamu", "Whatsapp", "Relation", "Tanggal Ditambah"]);
  }
  
  var rows = sheet.getDataRange().getValues();
  var guests = [];
  
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][0] && !rows[i][1]) continue;
    guests.push({
      id: rows[i][0] ? rows[i][0].toString() : Math.random().toString(36).substring(2, 9),
      name: rows[i][1],
      whatsapp: rows[i][2] ? rows[i][2].toString() : "",
      relation: rows[i][3] || "Teman",
      createdAt: rows[i][4] ? rows[i][4].toString() : new Date().toISOString()
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ success: true, guests: guests }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// 4. Add Guest
function addGuestData(data) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("TamuUndangan");
  
  if (!sheet) {
    sheet = doc.insertSheet("TamuUndangan");
    sheet.appendRow(["ID", "Nama Tamu", "Whatsapp", "Relation", "Tanggal Ditambah"]);
  }
  
  sheet.appendRow([
    data.id || Math.random().toString(36).substring(2, 9),
    data.name,
    data.whatsapp || "",
    data.relation || "Teman",
    new Date()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// 5. Delete Guest
function deleteGuestData(data) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("TamuUndangan");
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Sheet not found" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
  
  var rows = sheet.getDataRange().getValues();
  var deleted = false;
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === data.id.toString() || rows[i][1] === data.name) {
      sheet.deleteRow(i + 1);
      deleted = true;
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({ success: deleted }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}
`;
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(getGoogleScriptCode());
    showAlert("success", "Kode Apps Script berhasil disalin ke clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#FCF9F7] text-[#2C2C2C] pb-12 font-sans selection:bg-[#D4AF37]/30 selection:text-[#2C2C2C]">
      {/* Background pattern decor */}
      <div className="absolute inset-0 section-bg-pattern opacity-30 pointer-events-none" />

      {/* Floating alert notification */}
      {alertMsg && (
        <div 
          className={`fixed top-6 right-6 z-[300] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 border animate-fade-in ${
            alertMsg.type === "success" 
              ? "bg-[#FCF9F7] border-green-200 text-green-800" 
              : "bg-[#FCF9F7] border-red-200 text-red-800"
          }`}
        >
          {alertMsg.type === "success" ? (
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle size={14} />
            </div>
          )}
          <span className="font-medium text-sm">{alertMsg.text}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="sticky top-0 z-50 bg-[#FCF9F7]/95 backdrop-blur-md border-b border-[#D4AF37]/10 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = "/"}
            className="w-10 h-10 rounded-full bg-[#8B735B]/5 border border-[#8B735B]/15 hover:bg-[#8B735B]/10 flex items-center justify-center text-[#8B735B] transition-colors"
            title="Kembali ke Undangan"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide gold-gradient-text flex items-center gap-2">
              Bagus & Icha
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-elegant text-[#8B735B] font-semibold">
              Wedding Admin Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Connection Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            configured 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            <Database size={12} className={configured ? "text-green-500" : "text-amber-500"} />
            {configured ? "Google Sheets Terhubung" : "Mode Lokal (Brosur)"}
          </div>

          <button 
            onClick={loadData}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8B735B] bg-[#8B735B]/5 border border-[#8B735B]/15 rounded-lg hover:bg-[#8B735B]/10 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
            Sync
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-8 relative z-10">
        {/* Stats Overview */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="glass-card-gold p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-elegant text-[#8B735B] tracking-wider uppercase mb-1">Total Tamu</p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#8B735B]">{totalGuestsCount}</h3>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#8B735B]/5 border border-[#8B735B]/10 flex items-center justify-center text-[#8B735B]">
              <Users size={20} />
            </div>
          </div>

          <div className="glass-card-gold p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-elegant text-[#8B735B] tracking-wider uppercase mb-1">RSVP Hadir</p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-green-700">{attendanceStats.hadir} <span className="text-xs font-normal text-slate-500">tamu</span></h3>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
              <CheckSquare size={20} />
            </div>
          </div>

          <div className="glass-card-gold p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-elegant text-[#8B735B] tracking-wider uppercase mb-1">Tidak Hadir</p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-red-600">{attendanceStats.tidakHadir} <span className="text-xs font-normal text-slate-500">orang</span></h3>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
              <AlertCircle size={20} />
            </div>
          </div>

          <div className="glass-card-gold p-4 md:p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-elegant text-[#8B735B] tracking-wider uppercase mb-1">Total Ucapan</p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#D4AF37]">{totalWishesCount}</h3>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <MessageSquare size={20} />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D4AF37]/15 mb-8">
          <button 
            onClick={() => setActiveTab('guests')}
            className={`px-6 py-3 font-elegant text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'guests' 
                ? "border-[#8B735B] text-[#8B735B]" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Daftar Tamu Undangan
          </button>
          <button 
            onClick={() => setActiveTab('wishes')}
            className={`px-6 py-3 font-elegant text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'wishes' 
                ? "border-[#8B735B] text-[#8B735B]" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            RSVP & Ucapan ({wishes.length})
          </button>
          <button 
            onClick={() => setActiveTab('script')}
            className={`px-6 py-3 font-elegant text-sm font-semibold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'script' 
                ? "border-[#8B735B] text-[#8B735B]" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Code size={14} />
            Setup Database
          </button>
        </div>

        {/* Tab Content 1: Guests List */}
        {activeTab === 'guests' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Input Forms side */}
            <div className="space-y-6">
              {/* Form Add Guest */}
              <div className="glass-card-gold p-6">
                <h3 className="font-serif text-lg font-bold text-[#8B735B] mb-4 flex items-center gap-2 border-b border-[#D4AF37]/10 pb-2">
                  <Plus size={18} />
                  Tambah Tamu Baru
                </h3>
                
                <form onSubmit={handleAddGuest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nama Tamu</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Pak Budi & Istri"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B735B]/30 focus:border-[#8B735B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">No. WhatsApp (Opsional)</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: 08123456789"
                      value={inputWhatsapp}
                      onChange={(e) => setInputWhatsapp(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B735B]/30 focus:border-[#8B735B] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Kategori / Relasi</label>
                    <select 
                      value={inputRelation}
                      onChange={(e) => setInputRelation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B735B]/30 focus:border-[#8B735B] text-sm"
                    >
                      <option value="Teman">Teman</option>
                      <option value="Keluarga">Keluarga</option>
                      <option value="VVIP">VVIP</option>
                      <option value="Kerja">Rekan Kerja</option>
                      <option value="Tetangga">Tetangga</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#8B735B] hover:bg-[#725e49] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-95"
                  >
                    <Plus size={16} />
                    Tambahkan Tamu
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setIsBulkOpen(!isBulkOpen)}
                    className="text-xs font-medium text-[#8B735B] hover:underline"
                  >
                    {isBulkOpen ? "Sembunyikan Bulk Input" : "Tambah Banyak Tamu Sekaligus (Bulk)"}
                  </button>
                </div>
              </div>

              {/* Bulk Input Dialog */}
              {isBulkOpen && (
                <div className="glass-card-gold p-6 border-dashed border-[#D4AF37]/30">
                  <h4 className="font-serif text-base font-bold text-[#8B735B] mb-2">Bulk Add Tamu</h4>
                  <p className="text-[11px] text-slate-500 mb-4">
                    Masukkan daftar nama tamu. Pisahkan setiap nama dengan baris baru (Enter). 
                    Kategori default akan diset "Teman".
                  </p>
                  <textarea
                    rows={6}
                    placeholder="Contoh nama:&#10;Mas Joko&#10;Teh Rini&#10;Om Anto & Keluarga"
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    className="w-full p-3 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B735B]/30 focus:border-[#8B735B] text-sm mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleBulkAdd}
                      disabled={isLoading}
                      className="flex-1 py-2.5 bg-[#8B735B] hover:bg-[#725e49] text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Proses Tambah Banyak
                    </button>
                    <button
                      onClick={() => { setIsBulkOpen(false); setBulkNames(""); }}
                      className="px-4 py-2.5 border border-[#8B735B]/20 text-[#8B735B] text-xs rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* WhatsApp Template Selector Card */}
              <div className="glass-card-gold p-6">
                <h3 className="font-serif text-lg font-bold text-[#8B735B] mb-4 flex items-center gap-2 border-b border-[#D4AF37]/10 pb-2">
                  <Share2 size={18} />
                  Template Kirim WhatsApp
                </h3>
                
                <div className="space-y-3">
                  {templates.map(tpl => (
                    <label key={tpl.id} className="flex items-start gap-3 p-2 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="wa-template"
                        value={tpl.id}
                        checked={selectedTemplate === tpl.id}
                        onChange={() => setSelectedTemplate(tpl.id)}
                        className="mt-1 accent-[#8B735B]"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-700 block">{tpl.name}</span>
                        <span className="text-[10px] text-slate-400 block line-clamp-1">{tpl.template}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Guest List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search & Filter Controls */}
              <div className="glass-card-gold p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama tamu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B735B]/30 focus:border-[#8B735B] text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs text-slate-400 whitespace-nowrap">Filter Kategori:</span>
                  <select
                    value={filterRelation}
                    onChange={(e) => setFilterRelation(e.target.value)}
                    className="flex-1 md:flex-none px-3 py-2 bg-white border border-[#D4AF37]/20 rounded-xl focus:outline-none text-xs"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Teman">Teman</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="VVIP">VVIP</option>
                    <option value="Kerja">Rekan Kerja</option>
                    <option value="Tetangga">Tetangga</option>
                  </select>
                </div>
              </div>

              {/* Table wrapper */}
              <div className="glass-card-gold overflow-hidden">
                {isLoading && filteredGuests.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                    <RefreshCw size={24} className="animate-spin text-[#8B735B]" />
                    <p className="text-sm">Menghubungkan ke database...</p>
                  </div>
                ) : filteredGuests.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                    <Users size={32} className="text-slate-300" />
                    <p className="text-sm">Tidak ada tamu yang ditemukan.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#D4AF37]/10 bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-[#8B735B]">
                          <th className="px-6 py-4">Tamu</th>
                          <th className="px-6 py-4">Kategori</th>
                          <th className="px-6 py-4">Link Undangan</th>
                          <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredGuests.map((guest, index) => {
                          const invitationUrl = getInvitationLink(guest.name);
                          return (
                            <tr key={guest.id || index} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <span className="font-semibold text-slate-800 block">{guest.name}</span>
                                {guest.whatsapp && (
                                  <span className="text-xs text-slate-400 block font-mono">{guest.whatsapp}</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  guest.relation === 'Keluarga' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                  guest.relation === 'VVIP' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                  guest.relation === 'Kerja' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                  guest.relation === 'Tetangga' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                  'bg-slate-50 text-slate-600 border border-slate-200'
                                }`}>
                                  {guest.relation || 'Teman'}
                                </span>
                              </td>
                              <td className="px-6 py-4 max-w-xs truncate">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-400 font-mono select-all truncate block">
                                    {invitationUrl}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleCopyLink(guest.name, guest.id)}
                                    className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
                                      copiedId === guest.id
                                        ? "bg-green-50 border-green-200 text-green-600"
                                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                                    }`}
                                    title="Salin Link Undangan"
                                  >
                                    {copiedId === guest.id ? <Check size={14} /> : <Copy size={14} />}
                                  </button>
                                  
                                  <button
                                    onClick={() => handleShareWhatsapp(guest)}
                                    className="p-2 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 text-green-600 transition-colors flex items-center justify-center"
                                    title="Kirim ke WhatsApp"
                                  >
                                    <Share2 size={14} />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteGuest(guest.id, guest.name)}
                                    className="p-2 rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 text-red-500 transition-colors flex items-center justify-center"
                                    title="Hapus Tamu"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Count indicator */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                  <span>Menampilkan {filteredGuests.length} dari {guests.length} total tamu</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab Content 2: RSVP & Wishes List */}
        {activeTab === 'wishes' && (
          <section className="space-y-6">
            <div className="glass-card-gold p-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#8B735B]">
                  Daftar Ucapan & Doa Tamu
                </h3>
                <p className="text-xs text-slate-400">
                  Data konfirmasi kehadiran dan doa restu langsung dari website undangan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-400 bg-white border border-[#D4AF37]/10 rounded-2xl flex flex-col items-center gap-3">
                  <MessageSquare size={32} className="text-slate-300" />
                  <p className="text-sm">Belum ada ucapan yang masuk.</p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <div key={index} className="glass-card-gold p-6 relative flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="font-serif font-bold text-slate-800 text-base">{wish.name}</h4>
                        
                        {/* Attendance status badge */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          wish.status?.toLowerCase().includes('hadir') && !wish.status?.toLowerCase().includes('tidak')
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : wish.status?.toLowerCase().includes('tidak') 
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {wish.status || "Hadir"}
                        </span>
                      </div>
                      
                      {wish.whatsapp && (
                        <p className="text-[11px] font-mono text-slate-400 mb-2">WA: {wish.whatsapp}</p>
                      )}
                      
                      {wish.guests && Number(wish.guests) > 0 && (
                        <p className="text-[11px] font-semibold text-[#8B735B] mb-3">Membawa: {wish.guests} orang</p>
                      )}
                      
                      <p className="text-xs text-slate-600 leading-relaxed italic bg-[#8B735B]/5 p-3 rounded-xl border border-[#8B735B]/5 mb-4">
                        "{wish.message}"
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>
                        {wish.createdAt ? new Date(wish.createdAt).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : "-"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* Tab Content 3: Script Configuration instructions */}
        {activeTab === 'script' && (
          <section className="glass-card-gold p-6 md:p-8 max-w-4xl mx-auto space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#8B735B] mb-2 flex items-center gap-2">
                <Code size={20} />
                Integrasi Database Google Spreadsheet
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Untuk mengintegrasikan dashboard tamu undangan, Anda perlu memperbarui kode di Google Apps Script editor Anda. 
                Hal ini agar Apps Script dapat menyimpan dan memproses data "Tamu Undangan" secara otomatis selain data RSVP.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-xs leading-relaxed">
              <AlertCircle size={20} className="shrink-0 text-amber-500 mt-0.5" />
              <div>
                <strong className="font-bold block mb-1">Catatan Penting</strong>
                Jika Anda telah mendeploy Apps Script sebelumnya untuk RSVP, silakan buka project Apps Script tersebut, 
                ganti seluruh kodenya dengan kode di bawah ini, lalu lakukan <strong>"Manage Deployments" &rarr; klik edit &rarr; pilih versi BARU (New Version) &rarr; klik Deploy</strong>. 
                Jangan membuat Deployment baru karena URL-nya akan berubah. Jika membuat deployment baru, update URL-nya di file <code className="font-mono text-[11px] bg-amber-100 px-1 py-0.5 rounded">.env</code>.
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-4 text-sm text-slate-700">
              <h4 className="font-serif font-bold text-[#8B735B]">Langkah-langkah Setup:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Buka Google Spreadsheet Anda. Buat satu tab/sheet baru dan namai tepat <strong>TamuUndangan</strong>.
                </li>
                <li>
                  Tuliskan judul kolom berikut pada baris pertama di sheet <strong>TamuUndangan</strong>: 
                  <code className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 ml-2">ID</code>, 
                  <code className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 ml-1">Nama Tamu</code>, 
                  <code className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 ml-1">Whatsapp</code>, 
                  <code className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 ml-1">Relation</code>, 
                  <code className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 ml-1">Tanggal Ditambah</code>.
                </li>
                <li>
                  Di menu Spreadsheet, buka <strong>Extensions</strong> (Ekstensi) &rarr; <strong>Apps Script</strong>.
                </li>
                <li>
                  Hapus seluruh kode yang ada pada editor, lalu salin kode di bawah ini.
                </li>
                <li>
                  Klik tombol simpan (ikon disket) dan klik <strong>Deploy &rarr; Manage Deployments</strong>. Pilih edit (ikon pensil), pilih <strong>New version</strong> pada kolom Version, lalu klik <strong>Deploy</strong>.
                </li>
              </ol>
            </div>

            {/* Code Block Container */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">google-script-code.js</span>
                <button
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#8B735B] hover:bg-[#725e49] text-white font-semibold rounded-lg shadow-sm hover:shadow active:scale-95 transition-all"
                >
                  <Copy size={12} />
                  Salin Kode
                </button>
              </div>
              <pre className="w-full max-h-96 overflow-y-auto p-4 bg-slate-900 text-slate-200 text-xs font-mono rounded-xl border border-slate-800 leading-relaxed no-scrollbar select-all">
                {getGoogleScriptCode()}
              </pre>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
