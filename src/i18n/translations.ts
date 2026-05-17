export type Lang = 'en' | 'vi'

export const t = {
  nav: {
    about:    { en: 'About',      vi: 'Giới thiệu' },
    skills:   { en: 'Skills',     vi: 'Kỹ năng' },
    projects: { en: 'Projects',   vi: 'Dự án' },
    contact:  { en: 'Contact',    vi: 'Liên hệ' },
    hire:     { en: 'Hire Me',    vi: 'Thuê tôi' },
  },
  hero: {
    available: { en: 'Available for work', vi: 'Sẵn sàng nhận việc' },
    role:      { en: '.NET Developer & Open Source Contributor', vi: 'Lập trình viên .NET & Đóng góp Open Source' },
    desc:      {
      en: 'Passionate .NET developer specializing in enterprise systems — CRM, HRM, internal tools. Building robust apps that solve real problems and scale with your business.',
      vi: 'Lập trình viên .NET đam mê phát triển hệ thống doanh nghiệp — CRM, HRM, công cụ nội bộ. Xây dựng ứng dụng chắc chắn, giải quyết vấn đề thực tiễn và tăng trưởng cùng doanh nghiệp.',
    },
    viewProjects: { en: 'View Projects', vi: 'Xem dự án' },
    contact:      { en: 'Get In Touch',  vi: 'Liên hệ ngay' },
    quote:        { en: '"Kindness is my favorite optimization: it costs almost nothing and makes every system around me run better."', vi: '"Tử tế là tối ưu hóa yêu thích của tôi: nó gần như không tốn gì nhưng làm mọi hệ thống xung quanh chạy tốt hơn."' },
  },
  about: {
    tag:   { en: '01 // About', vi: '01 // Giới thiệu' },
    title: { en: 'Who Am I',    vi: 'Tôi là ai' },
    p1: {
      en: 'A passionate and experienced .NET developer specializing in both desktop and web development. With a strong background in C#, WPF, ASP.NET, Web API, and SQL Server.',
      vi: 'Lập trình viên .NET đam mê và có kinh nghiệm, chuyên về phát triển desktop lẫn web. Nền tảng vững chắc với C#, WPF, ASP.NET, Web API và SQL Server.',
    },
    p2: {
      en: 'I focus on building robust business applications that solve real-world problems. Strong in system design, multi-layered architecture and clean code practices.',
      vi: 'Tôi tập trung xây dựng ứng dụng doanh nghiệp vững chắc, giải quyết vấn đề thực tế. Tư duy mạnh về thiết kế hệ thống, kiến trúc đa tầng và clean code.',
    },
    p3: {
      en: 'Beyond commercial work, I contribute to the community by developing open-source projects — building tools everyone can use for free.',
      vi: 'Ngoài công việc thương mại, tôi đóng góp cho cộng đồng bằng các dự án open source — xây dựng công cụ để mọi người sử dụng miễn phí.',
    },
    cards: {
      enterprise: { en: 'Enterprise Systems',    vi: 'Hệ thống Doanh nghiệp' },
      opensource: { en: 'Open Source',           vi: 'Open Source' },
      fullstack:  { en: 'Full-Stack .NET',        vi: 'Full-Stack .NET' },
      clean:      { en: 'Clean Architecture',     vi: 'Clean Architecture' },
    },
  },
  skills: {
    tag:   { en: '02 // Skills', vi: '02 // Kỹ năng' },
    title: { en: 'Tech Arsenal', vi: 'Kho vũ khí kỹ thuật' },
    desc:  { en: 'Technologies I wield daily to build exceptional products.', vi: 'Công nghệ tôi dùng hằng ngày để tạo ra sản phẩm xuất sắc.' },
  },
  projects: {
    tag:       { en: '03 // Projects', vi: '03 // Dự án' },
    title:     { en: 'Open Source Work', vi: 'Dự án Open Source' },
    desc:      { en: 'Projects I built for the community — free to use, free to contribute.', vi: 'Các dự án tôi xây dựng cho cộng đồng — miễn phí sử dụng, miễn phí đóng góp.' },
    viewCode:  { en: 'View Code', vi: 'Xem code' },
    opensource:{ en: 'Open Source', vi: 'Mã nguồn mở' },
    forked:    { en: 'Forked', vi: 'Forked' },
  },
  contact: {
    tag:   { en: '04 // Contact', vi: '04 // Liên hệ' },
    title: { en: "Let's Build", vi: 'Hãy cùng xây dựng' },
    desc:  { en: "Have a project in mind or want to collaborate on open source? I'm available.", vi: 'Có dự án trong đầu hoặc muốn cộng tác open source? Tôi sẵn sàng.' },
    nameLbl:    { en: 'Name',    vi: 'Tên' },
    emailLbl:   { en: 'Email',  vi: 'Email' },
    msgLbl:     { en: 'Message', vi: 'Tin nhắn' },
    namePh:     { en: 'John Doe', vi: 'Nguyễn Văn A' },
    msgPh:      { en: 'Tell me about your project...', vi: 'Kể tôi nghe về dự án của bạn...' },
    send:       { en: 'Send Message', vi: 'Gửi tin nhắn' },
    sending:    { en: 'Sending...', vi: 'Đang gửi...' },
    sent:       { en: 'Message Sent!', vi: 'Đã gửi!' },
    sentSub:    { en: "I'll get back to you within 24 hours.", vi: 'Tôi sẽ phản hồi trong vòng 24 giờ.' },
    available:  { en: 'Open to opportunities — responding within 24h', vi: 'Sẵn sàng cho cơ hội mới — phản hồi trong 24h' },
    location:   { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh, Việt Nam' },
    timezone:   { en: 'GMT+7 (ICT)', vi: 'GMT+7 (ICT)' },
  },
  footer: {
    built: { en: 'Built with passion for the community', vi: 'Xây dựng với đam mê vì cộng đồng' },
    open:  { en: 'All projects are open source', vi: 'Tất cả dự án đều là mã nguồn mở' },
  },
}

export function tr(obj: { en: string; vi: string }, lang: Lang) {
  return obj[lang]
}
