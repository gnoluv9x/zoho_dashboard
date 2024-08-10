### Cách tính các chỉ số:

Công thức

```bash
perf = (AT / ET) * 100
```

- ET = tổng số duration của tasks có title chứa index của sprint hiện tại
  Ví dụ: [38][FE] Sửa title trang DSSP -> sẽ được tính cho ET của sprint 38
- AT = tổng số duration của tasks đã done hoặc done dev và không phải bug trong sprint hiện tại.
  Ví dụ: Sprint 38 có task [39][FE] Tạo màn báo cáo -> Mặc dù task của sprint 39 nhưng được làm trong sprint 38 và đã done -> task này sẽ được tính vào AT nhằm tăng perf của người dùng (do task này ko được tính vào ET)

### Điều kiện để tính được perf cho member

- Bắt buộc khi tạo task phải thêm tiền tố [SPRINT_NUMBER]
  - Ví dụ: [38][FE] Cập nhật title màn gói cước
- Bắt buộc tên sprint phải có số thứ tự và tháng năm
  - Ví dụ: Sprint 1 (T8_24), Sprint 2 (t8/24), Sprint 3 (T9-24)
- Bắt buộc phải đổi prefix của task khi đổi task sang sprint khác (làm ko kịp dẫn đến task nhảy sprint, hoặc làm trước task của sprint kế tiếp)
