# GIA PHẢ HỌ NGUYỄN — PWA V5

1. Đây là vỏ PWA GitHub Pages mở Web App Apps Script. `APP_URL` hiện để trống có chủ đích để tránh mở nhầm phiên bản production cũ.
2. Sau khi deploy Apps Script V5 và kiểm thử xong, dán URL Web App V5 kết thúc bằng `/exec` vào `config.js`; không đưa bí mật/mật khẩu vào file này.
3. Service worker dùng cache `gia-pha-pwa-v5`; sau deploy, đóng hoàn toàn PWA rồi mở lại.
4. PWA không chứa dữ liệu gia phả trực tiếp; dữ liệu được đọc/ghi bởi Apps Script theo quyền đăng nhập.
5. Chỉ deploy sau khi Apps Script đã được kiểm thử trên bản sao dữ liệu V6.
