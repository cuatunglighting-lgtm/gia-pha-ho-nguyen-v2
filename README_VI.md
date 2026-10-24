# GIA PHẢ HỌ NGUYỄN — PWA V11

1. PWA là vỏ GitHub Pages mở Web App Apps Script; không lưu dữ liệu thành viên trong cache PWA.
2. `config.js` có URL `/exec` do chủ dự án cung cấp. Cần xác minh URL này trỏ đúng deployment đã nghiệm thu trước khi dùng production.
3. Service worker cache là `gia-pha-pwa-v22-family-cluster-wide-lanes`; sau khi cập nhật GitHub Pages, đóng hoàn toàn ứng dụng/PWA rồi mở lại nếu trình duyệt còn cache cũ.
4. Chỉ phát hành production sau khi kiểm thử Apps Script, Google Sheets, PDF và Safari iPhone trên bản sao.
