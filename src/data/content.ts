export const profile = {
  name: 'Nguyễn Khắc Danh',
  handle: 'NguyenKhacDanh',
  email: 'nguyenkhacdanh.tdc2019@gmail.com',
  facebook: 'https://www.facebook.com/nguyenkhacdanh.1010',
  github: 'https://github.com/NguyenKhacDanh',
  zalo: '0981494148',
}

export const experience = [
  {
    period: '2021 — Present',
    role: { en: 'ERP Developer · Microsoft Dynamics AX / D365 F&O', vi: 'Lập trình viên ERP · Microsoft Dynamics AX / D365 F&O' },
    desc: {
      en: 'Customized and extended Microsoft Dynamics AX / D365 Finance & Operations — built custom modules, SSRS reports, workflows and system integrations for enterprise clients. Deep expertise in Finance, Supply Chain, HRM and inventory modules.',
      vi: 'Tùy chỉnh và mở rộng Microsoft Dynamics AX / D365 Finance & Operations — xây dựng module tùy chỉnh, báo cáo SSRS, workflow và tích hợp hệ thống cho khách hàng doanh nghiệp. Chuyên sâu về module Finance, Supply Chain, HRM và kho hàng.',
    },
    tags: ['Dynamics AX', 'D365 F&O', 'X++', 'C# / .NET', 'SQL Server', 'SSRS'],
    color: '#00ffa3',
    icon: '⚙️',
  },
  {
    period: '2021 — Present',
    role: { en: 'Automation Engineer · RPA & Business Process', vi: 'Kỹ sư Tự động hóa · RPA & Quy trình nghiệp vụ' },
    desc: {
      en: 'Built automation solutions reducing manual operations by 60%+. Created bots, scheduled tasks, data pipelines and integration bridges between ERP, web APIs and legacy systems. Delivered real-time dashboards and alert systems.',
      vi: 'Xây dựng giải pháp tự động hóa giảm 60%+ thao tác thủ công. Tạo bot, tác vụ định kỳ, pipeline dữ liệu và cầu nối tích hợp giữa ERP, web API và hệ thống cũ. Xây dựng dashboard thời gian thực và hệ thống cảnh báo.',
    },
    tags: ['Power Automate', 'Python Scripting', 'Task Scheduler', 'RabbitMQ', 'SignalR', 'Webhook'],
    color: '#38bdf8',
    icon: '🤖',
  },
  {
    period: '2021 — Present',
    role: { en: '.NET Full-Stack Developer · Enterprise & Open Source', vi: 'Lập trình viên Full-Stack .NET · Doanh nghiệp & Open Source' },
    desc: {
      en: 'Designed and delivered Warehouse, HRM, CRM, Student Portal, Lecturer Portal, Payment, Tax systems and Unity 3D / Zalo Mini App projects. Built clean-architecture APIs with PHP and .NET backends.',
      vi: 'Thiết kế và phát triển hệ thống Kho, HRM, CRM, Portal học viên, Portal giảng viên, Payment, Thuế và dự án Unity 3D / Zalo Mini App. Xây dựng API clean architecture với backend PHP và .NET.',
    },
    tags: ['ASP.NET Core', 'PHP', 'WPF / MVVM', 'ReactJS', 'Unity 3D', 'Zalo Mini App'],
    color: '#c084fc',
    icon: '💻',
  },
]

export const projects = [
  {
    num: '01',
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
    num: '02',
    name: 'QuanLyThuChi_Badminton',
    nameVi: 'Quản Lý Thu Chi Cầu Lông',
    desc: { en: 'Badminton club finance management system — income/expense tracking, member management.', vi: 'Hệ thống quản lý thu chi CLB cầu lông — theo dõi thu nhập/chi phí, quản lý thành viên.' },
    lang: 'HTML',
    langColor: '#e34c26',
    url: 'https://github.com/NguyenKhacDanh/QuanLyThuChi_Badminton',
    featured: false,
    community: true,
  },
  {
    num: '03',
    name: 'openclaw-1',
    nameVi: 'OpenClaw AI',
    desc: { en: 'Personal AI assistant for any OS and platform. Forked from openclaw/openclaw.', vi: 'Trợ lý AI cá nhân cho mọi HĐH và nền tảng. Forked từ openclaw/openclaw.' },
    lang: 'TypeScript',
    langColor: '#2b7489',
    url: 'https://github.com/NguyenKhacDanh/openclaw-1',
    featured: false,
    community: true,
    forked: true,
  },
  {
    num: '04',
    name: 'QRCode',
    nameVi: 'QRCode Generator',
    desc: { en: 'Open source QR code generator. Free to use, free to share.', vi: 'Công cụ tạo mã QR mã nguồn mở. Miễn phí sử dụng, miễn phí chia sẻ.' },
    lang: 'MIT License',
    langColor: '#00f5a0',
    url: 'https://github.com/NguyenKhacDanh/QRCode',
    featured: false,
    community: true,
  },
]

export const enterpriseProjects = [
  { icon:'🏭', name:{ en:'Warehouse Management', vi:'Hệ thống Kho' },          tech:'C# / .NET · SQL Server',        color:'#00ffa3' },
  { icon:'👥', name:{ en:'HRM System',            vi:'Hệ thống HRM' },           tech:'ASP.NET Core · React',           color:'#38bdf8' },
  { icon:'📊', name:{ en:'CRM Platform',           vi:'Nền tảng CRM' },           tech:'.NET · SQL Server · SignalR',    color:'#fb923c' },
  { icon:'🎓', name:{ en:'Student Portal',         vi:'Portal Học viên' },        tech:'ASP.NET MVC · Bootstrap',        color:'#c084fc' },
  { icon:'👨‍🏫', name:{ en:'Lecturer Portal',       vi:'Portal Giảng viên' },      tech:'Blazor · Entity Framework',      color:'#f472b6' },
  { icon:'💳', name:{ en:'Payment System',         vi:'Hệ thống Thanh toán' },    tech:'.NET · Payment Gateway',         color:'#fbbf24' },
  { icon:'🧾', name:{ en:'Tax Management System',  vi:'Hệ thống Thuế' },          tech:'C# · SQL Server · SSRS',         color:'#34d399' },
  { icon:'🎮', name:{ en:'Unity 3D Project',       vi:'Dự án Unity 3D' },         tech:'Unity · C# · 3D',               color:'#60a5fa' },
  { icon:'📱', name:{ en:'Zalo Mini App',           vi:'Zalo Mini App' },          tech:'React · Zalo API',               color:'#818cf8' },
  { icon:'🔗', name:{ en:'PHP Backend APIs',        vi:'Backend API (PHP)' },      tech:'PHP · Laravel · MySQL',          color:'#a78bfa' },
]

export const skillGroups = [
  {
    title: { en: 'ERP & Automation', vi: 'ERP & Tự động hóa' },
    color: '#00ffa3',
    tags: ['Microsoft Dynamics AX', 'D365 F&O', 'Add Service / Call Service', 'Windows Service', 'Hangfire', 'Chatwoot API', 'Power BI (basic)', 'Scheduled Tasks'],
  },
  {
    title: { en: 'Languages & .NET', vi: 'Ngôn ngữ & .NET' },
    color: '#38bdf8',
    tags: ['C# / .NET 8', 'ASP.NET MVC', 'Web API', 'WPF / WinForms / MVVM', 'Entity Framework', 'Dapper', 'SignalR', 'PHP / Laravel'],
  },
  {
    title: { en: 'Frontend & Mobile', vi: 'Frontend & Mobile' },
    color: '#fb923c',
    tags: ['ReactJS', 'TypeScript', 'Blazor', 'Angular', 'Tailwind CSS', 'Bootstrap', 'Unity 3D', 'Zalo Mini App'],
  },
  {
    title: { en: 'Databases & Infra', vi: 'Cơ sở dữ liệu & Hạ tầng' },
    color: '#c084fc',
    tags: ['SQL Server', 'Stored Procedures', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Azure DevOps'],
  },
]
