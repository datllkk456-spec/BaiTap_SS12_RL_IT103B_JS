# Dò vết và sửa lỗi điều kiện biên Grace Period

## 1. Phân tích lỗi

Trong hàm `auditSubscriptions(list)`, điều kiện `sub.daysOverdue >= 3` là nguyên nhân gây lỗi.

Điều kiện này khiến thuê bao bị hạ cấp ngay từ ngày nợ cước thứ 3, không đúng với yêu cầu nghiệp vụ. Khách hàng được phép sử dụng gói cũ trong 3 ngày đầu và chỉ bị hạ cấp khi số ngày nợ cước lớn hơn 3.

Cách sửa là thay `>= 3` bằng `> 3`.

## 2. Test Cases

### Test Case 1: Thuê bao nợ cước đúng 3 ngày

- Trường hợp kiểm thử: Kiểm tra điều kiện biên tại ngày thứ 3.
- Dữ liệu đầu vào: `daysOverdue = 3`, `planTier = 'FAMILY'`, `deviceLimit = 5`, `status = 'ACTIVE'`.
- Kết quả sai thực tế: Thuê bao bị hạ cấp về `FREE`, giới hạn thiết bị còn 1 và trạng thái là `EXPIRED`.
- Kết quả đúng mong đợi: Giữ nguyên gói `FAMILY`, giới hạn 5 thiết bị và chuyển trạng thái thành `GRACE_PERIOD`.

### Test Case 2: Thuê bao nợ cước 4 ngày

- Trường hợp kiểm thử: Kiểm tra thuê bao đã vượt quá thời gian ân hạn.
- Dữ liệu đầu vào: `daysOverdue = 4`, `planTier = 'FAMILY'`, `deviceLimit = 5`, `status = 'ACTIVE'`.
- Kết quả sai thực tế: Thuê bao bị hạ cấp về `FREE`, giới hạn thiết bị còn 1 và trạng thái là `EXPIRED`. Kết quả này trùng với mong đợi nhưng điều kiện xử lý chưa chính xác tại ngày thứ 3.
- Kết quả đúng mong đợi: Hạ cấp về `FREE`, đặt giới hạn thiết bị bằng 1 và chuyển trạng thái thành `EXPIRED`.

## 3. Kết luận

Sau khi sửa điều kiện từ `>= 3` thành `> 3`, hệ thống phân biệt chính xác thời gian ân hạn và thời gian quá hạn. Thuê bao nợ cước tối đa 3 ngày vẫn sử dụng gói cũ; thuê bao nợ cước từ ngày thứ 4 trở đi bị hạ cấp về gói `FREE` và chỉ được sử dụng 1 thiết bị.