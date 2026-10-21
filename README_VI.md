# GIA PHẢ HỌ NGUYỄN — PWA GitHub

## Cấu trúc
`index.html`, `config.js`, `manifest.json`, `service-worker.js`, 8 icon PNG và README.

## Cấu hình
Mở `config.js`, đặt URL Web App Apps Script đang triển khai, dạng `https://script.google.com/macros/s/.../exec`.

## GitHub Pages
Đưa các tệp trong thư mục này lên thư mục gốc của nhánh `master`; bật Pages cho nhánh `master`, thư mục gốc.

## Lưu ý
- PWA này là lớp vỏ, tương tự cấu trúc AN ĐỨC; giao diện nghiệp vụ và dữ liệu nằm trong Apps Script/Google Sheets.
- Backend Apps Script phải cho phép iframe. Quyền truy cập Web App vẫn phải được cấu hình phù hợp.
- Không đưa workbook, mật khẩu, token hoặc dữ liệu thành viên vào repository Public.
- Service worker chỉ cache tài nguyên tĩnh của PWA, không cache endpoint Apps Script.
