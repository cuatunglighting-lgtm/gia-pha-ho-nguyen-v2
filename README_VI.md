# GIA PHẢ HỌ NGUYỄN — PWA V10

1. PWA là vỏ GitHub Pages mở Web App Apps Script; không lưu dữ liệu thành viên trong cache PWA.
2. `config.js` đã điền URL `/exec` do chủ dự án cung cấp. Cần kiểm tra URL đang trỏ tới đúng deployment V10 trước khi dùng production.
3. Service worker cache hiện là `gia-pha-pwa-v10`; sau khi cập nhật GitHub Pages, đóng hoàn toàn ứng dụng/PWA rồi mở lại hoặc xóa dữ liệu website để loại cache cũ.
4. Chỉ phát hành production sau khi kiểm thử deployment Apps Script và dữ liệu Google Sheets trên bản sao.
