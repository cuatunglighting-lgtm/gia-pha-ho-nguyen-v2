# GIA PHẢ HỌ NGUYỄN — PWA V4

## Vai trò
PWA là vỏ GitHub Pages; nghiệp vụ và dữ liệu nằm trong Apps Script/Google Sheets. PWA không chứa dữ liệu gia phả hay thông tin đăng nhập.

## Cập nhật
1. Kiểm tra `config.js` trỏ tới URL Web App Apps Script kết thúc bằng `/exec`.
2. Đưa nội dung thư mục này lên GitHub Pages repo hiện tại, đúng thư mục đã cấu hình Pages.
3. Service worker dùng cache `gia-pha-pwa-v4`; sau khi deploy, đóng hoàn toàn PWA rồi mở lại để tải shell mới.
4. Kiểm tra icon, trang mở ứng dụng và đăng nhập trên iPhone.

## An toàn
- Không đưa workbook, mật khẩu, token hoặc dữ liệu thành viên lên repository Public.
- Service worker chỉ cache tài nguyên tĩnh của PWA, không can thiệp endpoint Apps Script.
- Không tự đổi URL Apps Script hoặc repo GitHub đã được người dùng chốt.
