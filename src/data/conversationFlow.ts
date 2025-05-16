import { ConversationNode, Language } from '../types/chatbot';

// Initial node ID
export const INITIAL_NODE_ID = 'welcome';

// Helper function to create language-specific nodes
const createNodes = (language: Language): Record<string, ConversationNode> => {
  if (language === 'id') {
    return {
      welcome: {
        id: 'welcome',
        messages: ['Selamat datang di ChatBot LSP MKS', 'Silahkan pilih bahasa yang akan anda gunakan'],
        options: [
          { id: 'id', label: 'Indonesia', action: 'language_id' },
          { id: 'en', label: 'English', action: 'language_en' }
        ]
      },
      main_menu: {
        id: 'main_menu',
        messages: [
          'Perkenalkan aku MIKA asisten virtual yang akan membantu memandu anda',
          'Baik. Silahkan pilih bagian mana yang dapat MIKA bantu'
        ],
        options: [
          { id: 'certification_programs', label: 'Program Sertifikasi', action: 'certification_programs' },
          { id: 'certification_schedule', label: 'Jadwal Sertifikasi', action: 'certification_schedule' },
          { id: 'certification_check', label: 'Cek Kesesuaian Sertifikasi', action: 'certification_check' },
          { id: 'certificate_status', label: 'Status Sertifikat', action: 'certificate_status' },
          { id: 'customer_service', label: 'Bantuan Costumer Service', action: 'customer_service' },
          { id: 'chatbot_guide', label: 'Pedoman Penggunaan ChatBot', action: 'chatbot_guide' }
        ]
      },
      certification_programs: {
        id: 'certification_programs',
        messages: [
          'Berikut MIKA berikan informasi mengenai program - program yang ada di LSP LPK MKS',
          'Kami menawarkan berbagai program sertifikasi profesi di bidang IT, Manajemen, dan Keuangan. Setiap program dirancang untuk memenuhi standar kompetensi nasional.'
        ],
        options: [{ id: 'back', label: 'Kembali', action: 'back_to_main' }],
        back: 'main_menu'
      },
      certification_schedule: {
        id: 'certification_schedule',
        messages: [
          'Berikut MIKA berikan informasi mengenai jadwal sertifikasi yang akan datang di LSP LPK MKS',
          'Jadwal Sertifikasi bulan Juli 2025:',
          '- Sertifikasi QRMO: 10-12 Juli 2025',
          '- Sertifikasi SDPSI: 17-19 Juli 2025',
          '- Sertifikasi FRM: 24-26 Juli 2025'
        ],
        options: [{ id: 'back', label: 'Kembali', action: 'back_to_main' }],
        back: 'main_menu'
      },
      certification_check: {
        id: 'certification_check',
        messages: [
          'MIKA akan bantu anda untuk mengecek kesesuaian profil anda dengan sertifikasi yang akan anda pilih. Pastikan CV/Resume yang akan digunakan sudah dalam bentuk PDF ya!'
        ],
        fileUpload: true,
        options: [{ id: 'upload_cv', label: 'Upload CV', action: 'upload_cv' }],
        back: 'main_menu'
      },
      certification_check_result: {
        id: 'certification_check_result',
        messages: [
          'Dari CV anda, sertifikasi yang memenuhi kriteria anda adalah : Sertifikasi Penyedia Data dan Sistem Informasi (SDPSI)',
          'Lanjut Daftar?'
        ],
        options: [
          { id: 'register', label: 'Daftar Sekarang', action: 'register_now' },
          { id: 'back', label: 'Kembali', action: 'back_to_main' }
        ],
        back: 'main_menu'
      },
      certificate_status: {
        id: 'certificate_status',
        messages: [
          'MIKA akan bantu mengecek status sertifikat anda dengan mengisi data di bawah ini dengan format: NAMA LENGKAP, JENIS SERTIFIKAT. (Contoh: Yusuf Munawar, QRMO)'
        ],
        input: true,
        inputPrompt: 'Masukkan nama dan jenis sertifikat',
        back: 'main_menu'
      },
      certificate_status_result: {
        id: 'certificate_status_result',
        messages: ['Sertifikat anda sudah valid'],
        options: [{ id: 'back', label: 'Kembali', action: 'back_to_main' }],
        back: 'main_menu'
      },
      customer_service: {
        id: 'customer_service',
        messages: [
          'Anda dapat menghubungi langsung ke Customer Service LSP LPK MKS dalam nomor berikut ini:',
          'Telepon: +62 21 1234 5678',
          'Email: cs@lspmks.id'
        ],
        options: [{ id: 'back', label: 'Kembali', action: 'back_to_main' }],
        back: 'main_menu'
      },
      chatbot_guide: {
        id: 'chatbot_guide',
        messages: [
          'Panduan Penggunaan Chatbot MIKA:',
          '1. Pilih menu yang tersedia untuk mendapatkan informasi',
          '2. Gunakan tombol "Kembali" untuk kembali ke menu sebelumnya',
          '3. Anda bisa mengetik pertanyaan langsung jika tersedia kolom input',
          '4. Untuk berbicara dengan CS, pilih menu "Bantuan Customer Service"'
        ],
        options: [{ id: 'back', label: 'Kembali', action: 'back_to_main' }],
        back: 'main_menu'
      }
    };
  } else {
    // English nodes
    return {
      welcome: {
        id: 'welcome',
        messages: ['Welcome to LSP MKS ChatBot', 'Please select your language'],
        options: [
          { id: 'id', label: 'Indonesia', action: 'language_id' },
          { id: 'en', label: 'English', action: 'language_en' }
        ]
      },
      main_menu: {
        id: 'main_menu',
        messages: [
          'Let me introduce myself. I am MIKA, a virtual assistant who will help guide you',
          'Please select which section MIKA can help you with'
        ],
        options: [
          { id: 'certification_programs', label: 'Certification Programs', action: 'certification_programs' },
          { id: 'certification_schedule', label: 'Certification Schedule', action: 'certification_schedule' },
          { id: 'certification_check', label: 'Check Certification Compatibility', action: 'certification_check' },
          { id: 'certificate_status', label: 'Certificate Status', action: 'certificate_status' },
          { id: 'customer_service', label: 'Customer Service Help', action: 'customer_service' },
          { id: 'chatbot_guide', label: 'ChatBot Usage Guide', action: 'chatbot_guide' }
        ]
      },
      certification_programs: {
        id: 'certification_programs',
        messages: [
          'Here MIKA provides information about the programs available at LSP LPK MKS',
          'We offer various professional certification programs in IT, Management, and Finance. Each program is designed to meet national competency standards.'
        ],
        options: [{ id: 'back', label: 'Back', action: 'back_to_main' }],
        back: 'main_menu'
      },
      certification_schedule: {
        id: 'certification_schedule',
        messages: [
          'Here MIKA provides information about upcoming certification schedules at LSP LPK MKS',
          'July 2025 Certification Schedule:',
          '- QRMO Certification: July 10-12, 2025',
          '- SDPSI Certification: July 17-19, 2025',
          '- FRM Certification: July 24-26, 2025'
        ],
        options: [{ id: 'back', label: 'Back', action: 'back_to_main' }],
        back: 'main_menu'
      },
      certification_check: {
        id: 'certification_check',
        messages: [
          'MIKA will help you check the compatibility of your profile with the certification you will choose. Make sure the CV/Resume you will use is already in PDF format!'
        ],
        fileUpload: true,
        options: [{ id: 'upload_cv', label: 'Upload CV', action: 'upload_cv' }],
        back: 'main_menu'
      },
      certification_check_result: {
        id: 'certification_check_result',
        messages: [
          'From your CV, the certification that meets your criteria is: Data Provider and Information System Certification (SDPSI)',
          'Continue to Register?'
        ],
        options: [
          { id: 'register', label: 'Register Now', action: 'register_now' },
          { id: 'back', label: 'Back', action: 'back_to_main' }
        ],
        back: 'main_menu'
      },
      certificate_status: {
        id: 'certificate_status',
        messages: [
          'MIKA will help check your certificate status by filling in the data below with the format: FULL NAME, CERTIFICATE TYPE. (Example: John Doe, QRMO)'
        ],
        input: true,
        inputPrompt: 'Enter name and certificate type',
        back: 'main_menu'
      },
      certificate_status_result: {
        id: 'certificate_status_result',
        messages: ['Your certificate is valid'],
        options: [{ id: 'back', label: 'Back', action: 'back_to_main' }],
        back: 'main_menu'
      },
      customer_service: {
        id: 'customer_service',
        messages: [
          'You can contact LSP LPK MKS Customer Service directly at the following number:',
          'Phone: +62 21 1234 5678',
          'Email: cs@lspmks.id'
        ],
        options: [{ id: 'back', label: 'Back', action: 'back_to_main' }],
        back: 'main_menu'
      },
      chatbot_guide: {
        id: 'chatbot_guide',
        messages: [
          'MIKA Chatbot Usage Guide:',
          '1. Select the available menu to get information',
          '2. Use the "Back" button to return to the previous menu',
          '3. You can type questions directly if an input field is available',
          '4. To speak with CS, select the "Customer Service Help" menu'
        ],
        options: [{ id: 'back', label: 'Back', action: 'back_to_main' }],
        back: 'main_menu'
      }
    };
  }
};

// Get conversation nodes based on language
export const getConversationNodes = (language: Language): Record<string, ConversationNode> => {
  return createNodes(language);
};

// Process user input
export const processUserInput = (input: string, nodeId: string,): string => {
  // This is a simplified implementation
  // In a real-world scenario, you might use NLP or more complex matching

  if (nodeId === 'certificate_status') {
    // Simple check if input contains both name and certification type
    if (input.includes(',') && input.split(',').length >= 2) {
      return 'certificate_status_result';
    } else {
      // Return same node if input format is incorrect
      return nodeId;
    }
  }

  return nodeId;
};

// Process file upload
export const processFileUpload = (file: File, nodeId: string): string => {
  // This is a simplified implementation
  // In a real-world scenario, you would process the file

  if (nodeId === 'certification_check' && file.type === 'application/pdf') {
    return 'certification_check_result';
  }

  return nodeId;
};

// Handle registration
export const handleRegistration = (): string => {
  // In a real implementation, this would redirect to registration page
  // For now, we'll just return to the main menu
  return 'main_menu';
};

// Get next node based on option
export const getNextNode = (optionId: string): string => {
  switch (optionId) {
    case 'id':
      return 'main_menu';
    case 'en':
      return 'main_menu';
    case 'certification_programs':
      return 'certification_programs';
    case 'certification_schedule':
      return 'certification_schedule';
    case 'certification_check':
      return 'certification_check';
    case 'certificate_status':
      return 'certificate_status';
    case 'customer_service':
      return 'customer_service';
    case 'chatbot_guide':
      return 'chatbot_guide';
    case 'back_to_main':
      return 'main_menu';
    case 'upload_cv':
      return 'certification_check';
    case 'register':
      return handleRegistration();
    default:
      return 'main_menu';
  }
};