export const profile = {
  name: 'Nguyễn Khắc Danh',
  handle: 'NguyenKhacDanh',
  email: 'nguyenkhacdanh.tdc2019@gmail.com',
  facebook: 'https://www.facebook.com/nguyenkhacdanh.1010',
  github: 'https://github.com/NguyenKhacDanh',
}

export const projects = [
  {
    num: '01',
    name: 'QuanLyThuChi_Badminton',
    nameVi: 'Quản Lý Thu Chi Cầu Lông',
    desc: { en: 'Badminton club finance management system — income/expense tracking, member management, HTML-based interface.', vi: 'Hệ thống quản lý thu chi CLB cầu lông — theo dõi thu nhập/chi phí, quản lý thành viên, giao diện HTML.' },
    lang: 'HTML',
    langColor: '#e34c26',
    url: 'https://github.com/NguyenKhacDanh/QuanLyThuChi_Badminton',
    featured: true,
    community: true,
  },
  {
    num: '02',
    name: 'openclaw-1',
    nameVi: 'OpenClaw AI',
    desc: { en: 'Your own personal AI assistant. Any OS. Any Platform. The lobster way. Forked from openclaw/openclaw.', vi: 'Trợ lý AI cá nhân. Bất kỳ HĐH. Bất kỳ nền tảng. Forked từ openclaw/openclaw.' },
    lang: 'TypeScript',
    langColor: '#2b7489',
    url: 'https://github.com/NguyenKhacDanh/openclaw-1',
    featured: false,
    community: true,
    forked: true,
  },
  {
    num: '03',
    name: 'QRCode',
    nameVi: 'QRCode Generator',
    desc: { en: 'Open source QR code generator by Nguyen Khac Danh. Free to use, free to share.', vi: 'Công cụ tạo mã QR mã nguồn mở. Miễn phí sử dụng, miễn phí chia sẻ.' },
    lang: 'MIT License',
    langColor: '#00f5a0',
    url: 'https://github.com/NguyenKhacDanh/QRCode',
    featured: false,
    community: true,
  },
  {
    num: '04',
    name: 'HeThongCuuHo_OpenSource',
    nameVi: 'Hệ Thống Cứu Hộ',
    desc: { en: 'Rescue & emergency disaster management system for flood response. Built with C# ASP.NET Core + GIS map + crisis management.', vi: 'Hệ thống cứu hộ và quản lý thảm họa lũ lụt. Xây dựng bằng C# ASP.NET Core + bản đồ GIS + quản lý khủng hoảng.' },
    lang: 'C#',
    langColor: '#178600',
    url: 'https://github.com/NguyenKhacDanh/HeThongCuuHo_OpenSource',
    featured: true,
    community: true,
  },
  {
    num: '05',
    name: 'NguyenKhacDanh',
    nameVi: 'GitHub Profile',
    desc: { en: 'My GitHub profile repository — containing profile README and public contributions.', vi: 'Repo hồ sơ GitHub của tôi — chứa README profile và đóng góp công khai.' },
    lang: 'Markdown',
    langColor: '#7d8590',
    url: 'https://github.com/NguyenKhacDanh/NguyenKhacDanh',
    featured: false,
    community: false,
  },
]

export const skillGroups = [
  {
    title: { en: 'Languages & .NET', vi: 'Ngôn ngữ & .NET' },
    color: 'var(--neon)',
    items: [
      { name: 'C# / .NET 8', level: 95 },
      { name: 'ASP.NET MVC / Web API', level: 92 },
      { name: 'WPF / WinForms', level: 88 },
      { name: 'Entity Framework / Dapper', level: 87 },
    ],
  },
  {
    title: { en: 'Frontend', vi: 'Frontend' },
    color: 'var(--neon2)',
    items: [
      { name: 'ReactJS / TypeScript', level: 80 },
      { name: 'VueJS / Angular', level: 72 },
      { name: 'Blazor', level: 75 },
      { name: 'Tailwind CSS / Bootstrap', level: 85 },
    ],
  },
  {
    title: { en: 'Databases & Infra', vi: 'Cơ sở dữ liệu & Hạ tầng' },
    color: 'var(--accent)',
    items: [
      { name: 'SQL Server (SP, triggers)', level: 93 },
      { name: 'PostgreSQL / MySQL', level: 80 },
      { name: 'MongoDB / Redis', level: 70 },
      { name: 'Docker / Azure DevOps', level: 75 },
    ],
  },
  {
    title: { en: 'Architecture', vi: 'Kiến trúc' },
    color: '#c084fc',
    items: [
      { name: 'Clean Architecture / CQRS', level: 85 },
      { name: 'JWT / OAuth2 / Identity', level: 88 },
      { name: 'SignalR / RabbitMQ', level: 78 },
      { name: 'CI/CD / GitFlow', level: 80 },
    ],
  },
]
