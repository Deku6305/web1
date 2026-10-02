/**
 * ShoesLish - Website Bán Giày
 * File: js/app.js
 * Mô tả: Module JavaScript cốt lõi - Quản lý giỏ hàng, người dùng, đơn hàng
 * Lưu trữ: LocalStorage
 */

'use strict';

// ============================================================
// CẤU HÌNH CHUNG
// ============================================================
const CONFIG = {
  tenShop: 'ShoesLish',
  donViTien: 'đ',
  phiShip: 30000,
  phiShipMienPhi: 500000,   // miễn phí ship khi đơn >= 500k
  soSanPhamMotTrang: 12,
};

// ============================================================
// DỮ LIỆU SẢN PHẨM (30 SẢN PHẨM)
// ============================================================
const DANH_SACH_SAN_PHAM = [
  // -------- NAM (8 sản phẩm) --------
  {
    id: 'sp001',
    ten: 'Giày Chạy Bộ Nam AirMax',
    danhMuc: 'nam',
    kieu: 'the-thao',
    gia: 990000,
    giaCu: 1290000,
    anh: 'images/card-item1.jpg',
    anhChiTiet: 'images/card-large-item1.jpg',
    anhGallery: ['images/card-large-item1.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày chạy bộ cao cấp AirMax với đệm khí tiên tiến, giúp giảm áp lực lên khớp gối. Phù hợp cho các buổi tập luyện cường độ cao.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Đen/Trắng', 'Xanh Navy', 'Đỏ'],
    tonKho: { '39': 5, '40': 8, '41': 10, '42': 7, '43': 6, '44': 3 },
    noiBat: true,
    moi: false,
    sale: true,
    luotXem: 1245,
  },
  {
    id: 'sp002',
    ten: 'Giày Da Oxford Nam',
    danhMuc: 'nam',
    kieu: 'lifestyle',
    gia: 1490000,
    giaCu: null,
    anh: 'images/card-item2.jpg',
    anhChiTiet: 'images/card-large-item2.jpg',
    anhGallery: ['images/card-large-item2.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày da thật Oxford kiểu dáng lịch lãm, phù hợp công sở và các buổi tiệc trang trọng. Đế cao su chống trơn trượt.',
    size: [40, 41, 42, 43, 44, 45],
    mauSac: ['Đen', 'Nâu', 'Nâu Sáng'],
    tonKho: { '40': 4, '41': 6, '42': 8, '43': 5, '44': 3, '45': 2 },
    noiBat: true,
    moi: false,
    sale: false,
    luotXem: 987,
  },
  {
    id: 'sp003',
    ten: 'Giày Sneaker Nam Classic',
    danhMuc: 'nam',
    kieu: 'lifestyle',
    gia: 750000,
    giaCu: 890000,
    anh: 'images/card-item3.jpg',
    anhChiTiet: 'images/card-large-item3.jpg',
    anhGallery: ['images/card-large-item3.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày sneaker cổ điển phong cách đường phố, thiết kế đơn giản nhưng tinh tế. Chất liệu canvas thoáng khí, đế cao su bền bỉ.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Trắng', 'Đen', 'Xám'],
    tonKho: { '39': 6, '40': 10, '41': 12, '42': 9, '43': 7, '44': 4 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 765,
  },
  {
    id: 'sp004',
    ten: 'Giày Leo Núi Nam TrailPro',
    danhMuc: 'nam',
    kieu: 'the-thao',
    gia: 1890000,
    giaCu: null,
    anh: 'images/card-item4.jpg',
    anhChiTiet: 'images/card-large-item4.jpg',
    anhGallery: ['images/card-large-item4.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày leo núi chuyên nghiệp với lớp đế Vibram chống trượt, chất liệu Gore-Tex chống nước. Hỗ trợ cổ chân tốt cho địa hình hiểm trở.',
    size: [40, 41, 42, 43, 44, 45],
    mauSac: ['Xanh Rêu', 'Đen/Xám', 'Nâu Đất'],
    tonKho: { '40': 3, '41': 5, '42': 6, '43': 4, '44': 3, '45': 1 },
    noiBat: true,
    moi: false,
    sale: false,
    luotXem: 543,
  },
  {
    id: 'sp005',
    ten: 'Dép Sandal Nam Sport',
    danhMuc: 'nam',
    kieu: 'lifestyle',
    gia: 350000,
    giaCu: 420000,
    anh: 'images/card-item5.jpg',
    anhChiTiet: 'images/card-large-item5.jpg',
    anhGallery: ['images/card-large-item5.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Dép sandal thể thao nam với quai điều chỉnh được, đế EVA siêu nhẹ êm ái. Thích hợp đi biển, dã ngoại.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Đen', 'Xanh Biển', 'Xám'],
    tonKho: { '39': 8, '40': 10, '41': 12, '42': 10, '43': 8, '44': 6 },
    noiBat: false,
    moi: false,
    sale: true,
    luotXem: 432,
  },
  {
    id: 'sp006',
    ten: 'Giày Bóng Đá Nam StrikeX',
    danhMuc: 'nam',
    kieu: 'the-thao',
    gia: 890000,
    giaCu: 1100000,
    anh: 'images/card-item6.jpg',
    anhChiTiet: 'images/card-large-item6.jpg',
    anhGallery: ['images/card-large-item6.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày bóng đá chuyên nghiệp với đinh FG phù hợp sân cỏ tự nhiên. Mũi giày ôm sát, tăng khả năng kiểm soát bóng.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Đỏ/Đen', 'Vàng/Đen', 'Trắng/Xanh'],
    tonKho: { '39': 4, '40': 7, '41': 8, '42': 6, '43': 5, '44': 3 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 678,
  },
  {
    id: 'sp007',
    ten: 'Boot Da Nam Chelsea',
    danhMuc: 'nam',
    kieu: 'lifestyle',
    gia: 1290000,
    giaCu: null,
    anh: 'images/card-item7.jpg',
    anhChiTiet: 'images/card-large-item7.jpg',
    anhGallery: ['images/card-large-item7.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Boot Chelsea da thật phong cách Anh quốc, co giãn hai bên dễ mang. Đế cao 3cm tạo chiều cao lý tưởng.',
    size: [40, 41, 42, 43, 44, 45],
    mauSac: ['Đen', 'Nâu'],
    tonKho: { '40': 3, '41': 5, '42': 7, '43': 5, '44': 4, '45': 2 },
    noiBat: false,
    moi: false,
    sale: false,
    luotXem: 389,
  },
  {
    id: 'sp008',
    ten: 'Giày Slip-on Nam Casual',
    danhMuc: 'nam',
    kieu: 'lifestyle',
    gia: 590000,
    giaCu: 690000,
    anh: 'images/card-item8.jpg',
    anhChiTiet: 'images/card-large-item8.jpg',
    anhGallery: ['images/card-large-item8.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày slip-on không dây tiện lợi, thiết kế tối giản hiện đại. Lót vải lưới thoáng khí, đế rubber bền chắc.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Xám', 'Đen', 'Trắng Kem'],
    tonKho: { '39': 6, '40': 9, '41': 11, '42': 8, '43': 6, '44': 4 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 512,
  },

  // -------- NỮ (8 sản phẩm) --------
  {
    id: 'sp009',
    ten: 'Giày Thể Thao Nữ CloudRun',
    danhMuc: 'nu',
    kieu: 'the-thao',
    gia: 850000,
    giaCu: 990000,
    anh: 'images/card-item9.jpg',
    anhChiTiet: 'images/card-large-item9.jpg',
    anhGallery: ['images/card-large-item9.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày chạy bộ nữ với công nghệ CloudRun giảm chấn tối ưu. Trọng lượng siêu nhẹ 185g, thoáng khí, phù hợp chạy bộ hàng ngày.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Hồng/Trắng', 'Tím/Trắng', 'Xanh Mint'],
    tonKho: { '35': 5, '36': 8, '37': 10, '38': 9, '39': 7, '40': 4 },
    noiBat: true,
    moi: false,
    sale: true,
    luotXem: 1432,
  },
  {
    id: 'sp010',
    ten: 'Giày Cao Gót Nữ Elegance',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 790000,
    giaCu: null,
    anh: 'images/card-item10.jpg',
    anhChiTiet: 'images/card-large-item10.jpg',
    anhGallery: ['images/card-large-item10.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày cao gót 7cm kiểu dáng thanh lịch, phù hợp công sở và tiệc tùng. Chất liệu da PU cao cấp, lót êm ái.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Đen', 'Nude', 'Đỏ Rượu'],
    tonKho: { '35': 4, '36': 6, '37': 8, '38': 7, '39': 5, '40': 3 },
    noiBat: true,
    moi: false,
    sale: false,
    luotXem: 1123,
  },
  {
    id: 'sp011',
    ten: 'Sandal Nữ Summer Bloom',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 420000,
    giaCu: 520000,
    anh: 'images/card-large-item1.jpg',
    anhChiTiet: 'images/card-large-item11.jpg',
    anhGallery: ['images/card-large-item11.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Sandal nữ mùa hè họa tiết hoa tươi, quai chéo duyên dáng. Đế bằng cork tự nhiên nhẹ và êm, phù hợp đi dạo.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Trắng Hoa', 'Vàng Kem', 'Hồng'],
    tonKho: { '35': 7, '36': 10, '37': 12, '38': 10, '39': 8, '40': 5 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 876,
  },
  {
    id: 'sp012',
    ten: 'Giày Sneaker Nữ PastelPop',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 680000,
    giaCu: 780000,
    anh: 'images/card-large-item2.jpg',
    anhChiTiet: 'images/card-large-item12.jpg',
    anhGallery: ['images/card-large-item12.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Sneaker nữ màu pastel dịu nhẹ, phù hợp phong cách Hàn Quốc. Đế platform 3cm tạo chiều cao tự nhiên, chất liệu vải lưới nhẹ.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Hồng Pastel', 'Xanh Baby', 'Tím Lavender'],
    tonKho: { '35': 6, '36': 9, '37': 11, '38': 8, '39': 6, '40': 4 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 934,
  },
  {
    id: 'sp013',
    ten: 'Giày Búp Bê Nữ Ballet',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 490000,
    giaCu: null,
    anh: 'images/card-large-item3.jpg',
    anhChiTiet: 'images/card-large-item3.jpg',
    anhGallery: ['images/card-large-item3.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày búp bê kiểu ballet cổ điển, chất liệu vải nhung mềm mại. Đế mỏng linh hoạt, có nơ trang trí nhỏ xinh trước mũi.',
    size: [35, 36, 37, 38, 39],
    mauSac: ['Hồng Nude', 'Đen', 'Đỏ'],
    tonKho: { '35': 5, '36': 8, '37': 10, '38': 7, '39': 5 },
    noiBat: false,
    moi: false,
    sale: false,
    luotXem: 567,
  },
  {
    id: 'sp014',
    ten: 'Boot Nữ Mùa Đông WarmStep',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 1190000,
    giaCu: 1490000,
    anh: 'images/card-large-item4.jpg',
    anhChiTiet: 'images/card-large-item4.jpg',
    anhGallery: ['images/card-large-item4.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Boot nữ cổ cao ấm áp với lớp lót lông bên trong. Đế chống trơn trượt, chất liệu da PU chống nước, phù hợp mùa đông.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Nâu', 'Đen', 'Xanh Rêu'],
    tonKho: { '35': 4, '36': 6, '37': 8, '38': 6, '39': 4, '40': 2 },
    noiBat: true,
    moi: false,
    sale: true,
    luotXem: 789,
  },
  {
    id: 'sp015',
    ten: 'Giày Espadrille Nữ Boho',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 380000,
    giaCu: null,
    anh: 'images/card-large-item5.jpg',
    anhChiTiet: 'images/card-large-item5.jpg',
    anhGallery: ['images/card-large-item5.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày espadrille nữ phong cách boho với đế cói đan tay. Dây buộc mắt cá chân, chất liệu vải cotton thoáng mát mùa hè.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Trắng', 'Be', 'Xanh Olive'],
    tonKho: { '35': 6, '36': 9, '37': 12, '38': 9, '39': 7, '40': 4 },
    noiBat: false,
    moi: true,
    sale: false,
    luotXem: 423,
  },
  {
    id: 'sp016',
    ten: 'Giày Mule Nữ Chic',
    danhMuc: 'nu',
    kieu: 'lifestyle',
    gia: 550000,
    giaCu: 650000,
    anh: 'images/card-large-item6.jpg',
    anhChiTiet: 'images/card-large-item6.jpg',
    anhGallery: ['images/card-large-item6.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày mule hở gót phong cách Pháp thanh lịch, gót block 5cm ổn định. Phù hợp đi làm hoặc dạo phố cuối tuần.',
    size: [35, 36, 37, 38, 39, 40],
    mauSac: ['Be Camel', 'Đen', 'Trắng'],
    tonKho: { '35': 5, '36': 8, '37': 10, '38': 8, '39': 6, '40': 3 },
    noiBat: false,
    moi: false,
    sale: true,
    luotXem: 612,
  },

  // -------- THỂ THAO (7 sản phẩm) --------
  {
    id: 'sp017',
    ten: 'Giày Chạy Bộ SpeedForce X',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 1290000,
    giaCu: 1590000,
    anh: 'images/card-large-item7.jpg',
    anhChiTiet: 'images/card-large-item7.jpg',
    anhGallery: ['images/card-large-item7.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày chạy bộ SpeedForce X với công nghệ carbon plate tạo lực đẩy tối đa. Dành cho vận động viên marathon chuyên nghiệp.',
    size: [38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Đen/Vàng', 'Trắng/Đỏ', 'Xanh/Cam'],
    tonKho: { '38': 3, '39': 5, '40': 7, '41': 8, '42': 6, '43': 5, '44': 3 },
    noiBat: true,
    moi: true,
    sale: true,
    luotXem: 1567,
  },
  {
    id: 'sp018',
    ten: 'Giày Bóng Rổ JumpHigh Elite',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 1690000,
    giaCu: null,
    anh: 'images/card-large-item8.jpg',
    anhChiTiet: 'images/card-large-item8.jpg',
    anhGallery: ['images/card-large-item8.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày bóng rổ cổ cao với hệ thống locking strap ôm chắc. Đế Zoom Air giảm chấn mạnh mẽ, cổ giày neoprene linh hoạt.',
    size: [40, 41, 42, 43, 44, 45],
    mauSac: ['Đen/Đỏ', 'Trắng/Xanh', 'Xám/Cam'],
    tonKho: { '40': 4, '41': 6, '42': 7, '43': 5, '44': 4, '45': 2 },
    noiBat: true,
    moi: false,
    sale: false,
    luotXem: 843,
  },
  {
    id: 'sp019',
    ten: 'Giày Cầu Lông FlightStep',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 790000,
    giaCu: 890000,
    anh: 'images/card-large-item9.jpg',
    anhChiTiet: 'images/card-large-item9.jpg',
    anhGallery: ['images/card-large-item9.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày cầu lông với đế non-marking không để lại vết trên sân. Công nghệ QuickTurn giúp xoay người linh hoạt trong từng pha cứu bóng.',
    size: [38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Trắng/Xanh Lá', 'Đen/Vàng', 'Đỏ/Trắng'],
    tonKho: { '38': 4, '39': 6, '40': 8, '41': 9, '42': 7, '43': 5, '44': 3 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 654,
  },
  {
    id: 'sp020',
    ten: 'Giày Đạp Xe CyclePro',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 950000,
    giaCu: null,
    anh: 'images/card-large-item10.jpg',
    anhChiTiet: 'images/card-large-item10.jpg',
    anhGallery: ['images/card-large-item10.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày đạp xe SPD-SL với đế carbon cứng chắc truyền lực tối ưu. Hệ thống khóa BOA tightening tiện lợi, giày nhẹ 230g.',
    size: [39, 40, 41, 42, 43, 44],
    mauSac: ['Trắng', 'Đen', 'Xanh Navy'],
    tonKho: { '39': 3, '40': 5, '41': 6, '42': 5, '43': 4, '44': 2 },
    noiBat: false,
    moi: false,
    sale: false,
    luotXem: 321,
  },
  {
    id: 'sp021',
    ten: 'Giày Gym Fitness PowerLift',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 1090000,
    giaCu: 1290000,
    anh: 'images/card-large-item11.jpg',
    anhChiTiet: 'images/card-large-item11.jpg',
    anhGallery: ['images/card-large-item11.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày tập gym chuyên dụng với gót nâng cao 20mm tối ưu tư thế squat. Đế phẳng cứng ổn định cho các bài tập nặng.',
    size: [39, 40, 41, 42, 43, 44, 45],
    mauSac: ['Đen', 'Đen/Đỏ', 'Xanh/Trắng'],
    tonKho: { '39': 4, '40': 6, '41': 8, '42': 7, '43': 5, '44': 4, '45': 2 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 478,
  },
  {
    id: 'sp022',
    ten: 'Giày Tennis CourtAce',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 1150000,
    giaCu: null,
    anh: 'images/card-large-item12.jpg',
    anhChiTiet: 'images/card-large-item12.jpg',
    anhGallery: ['images/card-large-item12.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày tennis với đế herringbone chống trượt tốt trên sân đất nện. Phần hông giày tăng cường chống mòn, ổn định khi di chuyển ngang.',
    size: [38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Trắng', 'Trắng/Xanh Nước Biển', 'Đen/Vàng'],
    tonKho: { '38': 3, '39': 5, '40': 7, '41': 6, '42': 5, '43': 4, '44': 2 },
    noiBat: false,
    moi: false,
    sale: false,
    luotXem: 398,
  },
  {
    id: 'sp023',
    ten: 'Giày Bơi Lội AquaDash',
    danhMuc: 'the-thao',
    kieu: 'the-thao',
    gia: 290000,
    giaCu: 350000,
    anh: 'images/card-large-item1.jpg',
    anhChiTiet: 'images/card-large-item1.jpg',
    anhGallery: ['images/card-large-item1.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày bơi lội và đi biển chất liệu lycra co giãn 4 chiều. Thoát nước nhanh, đế cao su chống trơn trên nền ướt.',
    size: [36, 37, 38, 39, 40, 41, 42, 43],
    mauSac: ['Xanh Nước Biển', 'Đen', 'Cam Neon'],
    tonKho: { '36': 8, '37': 10, '38': 12, '39': 12, '40': 10, '41': 8, '42': 6, '43': 4 },
    noiBat: false,
    moi: true,
    sale: true,
    luotXem: 567,
  },

  // -------- LIFESTYLE / CASUAL (7 sản phẩm) --------
  {
    id: 'sp024',
    ten: 'Giày Vans Old Skool Style',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 890000,
    giaCu: null,
    anh: 'images/card-large-item2.jpg',
    anhChiTiet: 'images/card-large-item2.jpg',
    anhGallery: ['images/card-large-item2.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày canvas phong cách skate kinh điển với sọc bên signature. Đế vulcanized mỏng ôm board, lót Ultraclub êm.',
    size: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Đen/Trắng', 'Trắng', 'Navy/Trắng', 'Đỏ/Trắng'],
    tonKho: { '36': 5, '37': 7, '38': 9, '39': 10, '40': 10, '41': 8, '42': 7, '43': 5, '44': 3 },
    noiBat: true,
    moi: false,
    sale: false,
    luotXem: 2134,
  },
  {
    id: 'sp025',
    ten: 'Sneaker Chunky SoleVibes',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 1050000,
    giaCu: 1250000,
    anh: 'images/card-large-item3.jpg',
    anhChiTiet: 'images/card-large-item3.jpg',
    anhGallery: ['images/card-large-item3.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Sneaker đế bánh mì chunky trend 2024 với đế EVA dày 5cm. Phối màu pastel dễ thương, phù hợp street style hiện đại.',
    size: [36, 37, 38, 39, 40, 41, 42],
    mauSac: ['Trắng Kem/Be', 'Đen/Xám', 'Hồng/Trắng'],
    tonKho: { '36': 6, '37': 8, '38': 10, '39': 9, '40': 8, '41': 6, '42': 4 },
    noiBat: true,
    moi: true,
    sale: true,
    luotXem: 1876,
  },
  {
    id: 'sp026',
    ten: 'Giày Loafer Da Lộn UrbanWalk',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 980000,
    giaCu: null,
    anh: 'images/card-large-item4.jpg',
    anhChiTiet: 'images/card-large-item4.jpg',
    anhGallery: ['images/card-large-item4.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày loafer da lộn Nubuck mềm mại, phù hợp cả nam lẫn nữ. Trang trí khóa kim loại logo sang trọng, đế cao su nhẹ.',
    size: [36, 37, 38, 39, 40, 41, 42, 43],
    mauSac: ['Camel', 'Đen', 'Xanh Cobalt'],
    tonKho: { '36': 4, '37': 6, '38': 8, '39': 7, '40': 7, '41': 5, '42': 4, '43': 2 },
    noiBat: false,
    moi: false,
    sale: false,
    luotXem: 987,
  },
  {
    id: 'sp027',
    ten: 'Dép Birken Style Footbed',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 490000,
    giaCu: 590000,
    anh: 'images/card-large-item5.jpg',
    anhChiTiet: 'images/card-large-item5.jpg',
    anhGallery: ['images/card-large-item5.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Dép phong cách Birkenstock với lòng đế cork định hình theo chân. Hai quai điều chỉnh cổ chân và mu bàn chân, chống mùi hôi.',
    size: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Nâu Da', 'Đen', 'Be'],
    tonKho: { '36': 7, '37': 9, '38': 11, '39': 11, '40': 9, '41': 7, '42': 5, '43': 4, '44': 2 },
    noiBat: false,
    moi: false,
    sale: true,
    luotXem: 1234,
  },
  {
    id: 'sp028',
    ten: 'Giày Converse High-Top Classic',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 790000,
    giaCu: null,
    anh: 'images/card-large-item6.jpg',
    anhChiTiet: 'images/card-large-item6.jpg',
    anhGallery: ['images/card-large-item6.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb2.jpg'],
    moTa: 'Giày cổ cao phong cách Converse kinh điển, chất liệu canvas bền bỉ. Đế vulcanized linh hoạt, đinh tán kim loại trang trí.',
    size: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Trắng', 'Đen', 'Đỏ', 'Navy'],
    tonKho: { '36': 6, '37': 8, '38': 10, '39': 10, '40': 9, '41': 7, '42': 6, '43': 4, '44': 2 },
    noiBat: false,
    moi: true,
    sale: false,
    luotXem: 1654,
  },
  {
    id: 'sp029',
    ten: 'Giày Mocassin Lười CityStep',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 650000,
    giaCu: 750000,
    anh: 'images/card-large-item7.jpg',
    anhChiTiet: 'images/card-large-item7.jpg',
    anhGallery: ['images/card-large-item7.jpg', 'images/single-product-thumb2.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Giày lười mocassin da mềm siêu thoải mái, không cần tất. Đế rubber mỏng chống trơn, lót da xử lý kháng khuẩn.',
    size: [37, 38, 39, 40, 41, 42, 43, 44],
    mauSac: ['Nâu Đất', 'Đen', 'Camel'],
    tonKho: { '37': 5, '38': 7, '39': 9, '40': 8, '41': 7, '42': 5, '43': 4, '44': 2 },
    noiBat: false,
    moi: false,
    sale: true,
    luotXem: 743,
  },
  {
    id: 'sp030',
    ten: 'Platform Sneaker Y2K RetroBold',
    danhMuc: 'lifestyle',
    kieu: 'lifestyle',
    gia: 1190000,
    giaCu: 1390000,
    anh: 'images/card-large-item8.jpg',
    anhChiTiet: 'images/card-large-item8.jpg',
    anhGallery: ['images/card-large-item8.jpg', 'images/single-product-thumb1.jpg', 'images/single-product-thumb3.jpg'],
    moTa: 'Sneaker platform phong cách Y2K retro táo bạo với đế thick 6cm. Phối màu neon nổi bật, vật liệu mixed-media độc đáo.',
    size: [36, 37, 38, 39, 40, 41, 42],
    mauSac: ['Trắng/Bạc', 'Đen/Vàng', 'Hồng Neon'],
    tonKho: { '36': 4, '37': 6, '38': 8, '39': 7, '40': 6, '41': 4, '42': 2 },
    noiBat: true,
    moi: true,
    sale: true,
    luotXem: 2345,
  },
];

// ============================================================
// MÃ GIẢM GIÁ
// ============================================================
const MA_GIAM_GIA = [
  { ma: 'SHOESLISH10', phanTram: 10, moTa: 'Giảm 10% toàn đơn', hetHan: '2027-12-31', soLanDung: 100 },
  { ma: 'WELCOME20', phanTram: 20, moTa: 'Chào mừng khách mới giảm 20%', hetHan: '2027-06-30', soLanDung: 50 },
  { ma: 'SUMMER15', phanTram: 15, moTa: 'Sale hè giảm 15%', hetHan: '2027-08-31', soLanDung: 200 },
];

// ============================================================
// TIỆN ÍCH
// ============================================================
const Utils = {
  /** Format số tiền sang VNĐ */
  formatTien(so) {
    return so.toLocaleString('vi-VN') + CONFIG.donViTien;
  },

  /** Tạo ID ngẫu nhiên */
  taoId(prefix = 'id') {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  },

  /** Tạo mã đơn hàng */
  taoMaDon() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `DH${yyyy}${mm}${dd}${rand}`;
  },

  /** Lấy ngày hiện tại dạng chuỗi */
  ngayHienTai() {
    return new Date().toLocaleDateString('vi-VN');
  },

  /** Lấy tham số URL */
  layParamURL(ten) {
    const params = new URLSearchParams(window.location.search);
    return params.get(ten);
  },

  /** Hiển thị toast thông báo */
  hienToast(noiDung, loai = 'success') {
    let toast = document.getElementById('sl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sl-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = noiDung;
    toast.className = `sl-toast sl-toast-${loai} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  },

  /** Lấy sản phẩm theo ID */
  laySanPham(id) {
    return DANH_SACH_SAN_PHAM.find(sp => sp.id === id) || null;
  },
};

// ============================================================
// MODULE GIỎ HÀNG
// ============================================================
const GioHang = {
  KEY: 'shoeslish_gio_hang',

  layDanhSach() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  },

  luuDanhSach(ds) {
    localStorage.setItem(this.KEY, JSON.stringify(ds));
    this.capNhatBadge();
  },

  them(idSanPham, size, mauSac, soLuong = 1) {
    const sp = Utils.laySanPham(idSanPham);
    if (!sp) return false;

    const ds = this.layDanhSach();
    const key = `${idSanPham}_${size}_${mauSac}`;
    const vitri = ds.findIndex(item => item.key === key);

    if (vitri >= 0) {
      ds[vitri].soLuong += soLuong;
    } else {
      ds.push({
        key,
        id: idSanPham,
        ten: sp.ten,
        anh: sp.anh,
        gia: sp.gia,
        size,
        mauSac,
        soLuong,
      });
    }

    this.luuDanhSach(ds);
    Utils.hienToast(`Đã thêm "${sp.ten}" vào giỏ hàng!`, 'success');
    return true;
  },

  xoa(key) {
    const ds = this.layDanhSach().filter(item => item.key !== key);
    this.luuDanhSach(ds);
    Utils.hienToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  },

  capNhatSoLuong(key, soLuong) {
    const ds = this.layDanhSach();
    const vitri = ds.findIndex(item => item.key === key);
    if (vitri >= 0) {
      if (soLuong <= 0) {
        ds.splice(vitri, 1);
        Utils.hienToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
      } else {
        ds[vitri].soLuong = soLuong;
      }
      this.luuDanhSach(ds);
    }
  },

  tinhTamTinh() {
    return this.layDanhSach().reduce((tong, item) => tong + item.gia * item.soLuong, 0);
  },

  tinhPhiShip() {
    const tamTinh = this.tinhTamTinh();
    return tamTinh >= CONFIG.phiShipMienPhi ? 0 : CONFIG.phiShip;
  },

  tinhTong(giaTriGiamGia = 0) {
    return this.tinhTamTinh() - giaTriGiamGia + this.tinhPhiShip();
  },

  demSoLuong() {
    return this.layDanhSach().reduce((tong, item) => tong + item.soLuong, 0);
  },

  capNhatBadge() {
    const so = this.demSoLuong();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = so > 0 ? so : '';
      el.style.display = so > 0 ? 'flex' : 'none';
    });
  },

  lamTrong() {
    localStorage.removeItem(this.KEY);
    this.capNhatBadge();
  },

  apMaGiam(ma) {
    const maUpper = ma.toUpperCase().trim();
    const found = MA_GIAM_GIA.find(m => m.ma === maUpper);
    if (!found) return { ok: false, thongBao: 'Mã giảm giá không hợp lệ!' };
    const now = new Date();
    const hetHan = new Date(found.hetHan);
    if (now > hetHan) return { ok: false, thongBao: 'Mã giảm giá đã hết hạn!' };
    const giaTriGiam = Math.round(this.tinhTamTinh() * found.phanTram / 100);
    return { ok: true, phanTram: found.phanTram, giaTriGiam, moTa: found.moTa, thongBao: `${found.moTa} (-${Utils.formatTien(giaTriGiam)})` };
  },
};

// ============================================================
// MODULE NGƯỜI DÙNG
// ============================================================
const NguoiDung = {
  KEY_DANH_SACH: 'shoeslish_nguoidung',
  KEY_HIENTAI: 'shoeslish_hientai',

  layDanhSach() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY_DANH_SACH) || '[]');
    } catch {
      return [];
    }
  },

  layHienTai() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY_HIENTAI) || 'null');
    } catch {
      return null;
    }
  },

  daDangNhap() {
    return this.layHienTai() !== null;
  },

  dangKy(ten, email, matKhau) {
    if (!ten || !email || !matKhau) return { ok: false, loi: 'Vui lòng điền đầy đủ thông tin!' };
    if (matKhau.length < 6) return { ok: false, loi: 'Mật khẩu phải có ít nhất 6 ký tự!' };
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return { ok: false, loi: 'Email không hợp lệ!' };

    const ds = this.layDanhSach();
    if (ds.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, loi: 'Email đã được đăng ký, vui lòng dùng email khác!' };
    }

    const nguoiMoi = {
      id: Utils.taoId('usr'),
      ten: ten.trim(),
      email: email.toLowerCase().trim(),
      matKhau,
      soDienThoai: '',
      diaChi: '',
      ngayTao: new Date().toISOString(),
    };

    ds.push(nguoiMoi);
    localStorage.setItem(this.KEY_DANH_SACH, JSON.stringify(ds));
    this._luuHienTai(nguoiMoi);
    return { ok: true };
  },

  dangNhap(email, matKhau) {
    if (!email || !matKhau) return { ok: false, loi: 'Vui lòng nhập email và mật khẩu!' };
    const ds = this.layDanhSach();
    const nguoi = ds.find(u => u.email.toLowerCase() === email.toLowerCase() && u.matKhau === matKhau);
    if (!nguoi) return { ok: false, loi: 'Email hoặc mật khẩu không đúng!' };
    this._luuHienTai(nguoi);
    return { ok: true, nguoi };
  },

  dangXuat() {
    localStorage.removeItem(this.KEY_HIENTAI);
    this.capNhatUIHeader();
    window.location.href = 'index.html';
  },

  _luuHienTai(nguoi) {
    const data = { id: nguoi.id, ten: nguoi.ten, email: nguoi.email };
    localStorage.setItem(this.KEY_HIENTAI, JSON.stringify(data));
    this.capNhatUIHeader();
  },

  capNhatThongTin(thongTin) {
    const hienTai = this.layHienTai();
    if (!hienTai) return false;
    const ds = this.layDanhSach();
    const vitri = ds.findIndex(u => u.id === hienTai.id);
    if (vitri < 0) return false;
    Object.assign(ds[vitri], thongTin);
    localStorage.setItem(this.KEY_DANH_SACH, JSON.stringify(ds));
    this._luuHienTai(ds[vitri]);
    return true;
  },

  layThongTinDayDu() {
    const hienTai = this.layHienTai();
    if (!hienTai) return null;
    return this.layDanhSach().find(u => u.id === hienTai.id) || null;
  },

  capNhatUIHeader() {
    const hienTai = this.layHienTai();
    const iconUser = document.querySelectorAll('.user-icon-link');
    const tenHienThi = document.querySelectorAll('.ten-nguoi-dung');
    const btnDangNhap = document.querySelectorAll('.btn-show-login');
    const btnDangXuat = document.querySelectorAll('.btn-dang-xuat');
    const menuTaiKhoan = document.querySelectorAll('.menu-tai-khoan');

    if (hienTai) {
      tenHienThi.forEach(el => el.textContent = hienTai.ten);
      btnDangNhap.forEach(el => el.style.display = 'none');
      btnDangXuat.forEach(el => el.style.display = 'block');
      menuTaiKhoan.forEach(el => { el.style.display = 'block'; el.href = 'tai-khoan.html'; });
    } else {
      tenHienThi.forEach(el => el.textContent = 'Tài khoản');
      btnDangNhap.forEach(el => el.style.display = 'block');
      btnDangXuat.forEach(el => el.style.display = 'none');
      menuTaiKhoan.forEach(el => el.style.display = 'none');
    }
  },
};

// ============================================================
// MODULE ĐƠN HÀNG
// ============================================================
const DonHang = {
  KEY: 'shoeslish_don_hang',

  layDanhSach() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  },

  tao(thongTinGiao, phuongThucThanhToan, maGiam = null, giaTriGiam = 0) {
    const hienTai = NguoiDung.layHienTai();
    const gioHang = GioHang.layDanhSach();
    if (gioHang.length === 0) return { ok: false, loi: 'Giỏ hàng trống!' };

    const maDon = Utils.taoMaDon();
    const donMoi = {
      maDon,
      ngayDat: new Date().toISOString(),
      nguoiDatId: hienTai ? hienTai.id : 'khach',
      sanPham: [...gioHang],
      tamTinh: GioHang.tinhTamTinh(),
      phiShip: GioHang.tinhPhiShip(),
      maGiam,
      giaTriGiam,
      tongTien: GioHang.tinhTong(giaTriGiam),
      trangThai: 'Đang xử lý',
      phuongThucThanhToan,
      thongTinGiao: { ...thongTinGiao },
    };

    const ds = this.layDanhSach();
    ds.unshift(donMoi);
    localStorage.setItem(this.KEY, JSON.stringify(ds));
    GioHang.lamTrong();

    // Lưu đơn mới nhất để trang xác nhận đọc
    localStorage.setItem('shoeslish_don_moi_nhat', JSON.stringify(donMoi));
    return { ok: true, maDon };
  },

  layTheoMa(maDon) {
    return this.layDanhSach().find(d => d.maDon === maDon) || null;
  },

  layTheoNguoiDung(userId) {
    return this.layDanhSach().filter(d => d.nguoiDatId === userId);
  },
};

// ============================================================
// MODULE TÌM KIẾM & LỌC
// ============================================================
const TimKiem = {
  loc(boLoc = {}) {
    let ds = [...DANH_SACH_SAN_PHAM];

    // Lọc theo danh mục
    if (boLoc.danhMuc && boLoc.danhMuc !== 'tat-ca') {
      ds = ds.filter(sp => sp.danhMuc === boLoc.danhMuc);
    }

    // Lọc theo từ khóa
    if (boLoc.tuKhoa && boLoc.tuKhoa.trim()) {
      const kw = boLoc.tuKhoa.toLowerCase().trim();
      ds = ds.filter(sp =>
        sp.ten.toLowerCase().includes(kw) ||
        sp.moTa.toLowerCase().includes(kw) ||
        sp.danhMuc.includes(kw)
      );
    }

    // Lọc theo giá
    if (boLoc.giaTu !== undefined && boLoc.giaTu !== null) {
      ds = ds.filter(sp => sp.gia >= boLoc.giaTu);
    }
    if (boLoc.giaDen !== undefined && boLoc.giaDen !== null) {
      ds = ds.filter(sp => sp.gia <= boLoc.giaDen);
    }

    // Lọc sale
    if (boLoc.chySale) {
      ds = ds.filter(sp => sp.sale);
    }

    // Lọc mới
    if (boLoc.chyMoi) {
      ds = ds.filter(sp => sp.moi);
    }

    // Sắp xếp
    switch (boLoc.sapXep) {
      case 'gia-tang':
        ds.sort((a, b) => a.gia - b.gia); break;
      case 'gia-giam':
        ds.sort((a, b) => b.gia - a.gia); break;
      case 'moi-nhat':
        ds.sort((a, b) => (b.moi ? 1 : 0) - (a.moi ? 1 : 0)); break;
      case 'pho-bien':
        ds.sort((a, b) => b.luotXem - a.luotXem); break;
      default:
        break;
    }

    return ds;
  },

  phanTrang(ds, trang = 1, soMoiTrang = CONFIG.soSanPhamMotTrang) {
    const batDau = (trang - 1) * soMoiTrang;
    const ketThuc = batDau + soMoiTrang;
    return {
      data: ds.slice(batDau, ketThuc),
      tongTrang: Math.ceil(ds.length / soMoiTrang),
      trangHienTai: trang,
      tongSo: ds.length,
    };
  },
};

// ============================================================
// MODULE RENDER UI
// ============================================================
const UI = {
  /** Render 1 card sản phẩm */
  renderCardSanPham(sp) {
    const giamGia = sp.giaCu ? Math.round((1 - sp.gia / sp.giaCu) * 100) : 0;
    const badgeSale = sp.sale && giamGia > 0 ? `<span class="badge-sale">-${giamGia}%</span>` : '';
    const badgeMoi = sp.moi ? `<span class="badge-moi">Mới</span>` : '';

    return `
      <div class="col mb-4">
        <div class="product-card position-relative" data-id="${sp.id}">
          <div class="card-img">
            <a href="san-pham.html?id=${sp.id}">
              <img src="${sp.anh}" alt="${sp.ten}" class="product-image img-fluid" loading="lazy">
            </a>
            <div class="card-badges">${badgeSale}${badgeMoi}</div>
            <div class="cart-concern position-absolute d-flex justify-content-center">
              <div class="cart-button d-flex gap-2 justify-content-center align-items-center">
                <button type="button" class="btn btn-light btn-them-gio" 
                  data-id="${sp.id}" data-ten="${sp.ten}"
                  title="Thêm vào giỏ hàng">
                  <svg width="20" height="20"><use xlink:href="#shopping-carriage"></use></svg>
                </button>
                <a href="san-pham.html?id=${sp.id}" class="btn btn-light" title="Xem chi tiết">
                  <svg width="20" height="20"><use xlink:href="#quick-view"></use></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="card-detail d-flex justify-content-between align-items-center mt-3">
            <h3 class="card-title fs-6 fw-normal m-0">
              <a href="san-pham.html?id=${sp.id}">${sp.ten}</a>
            </h3>
            <div class="price-wrap text-end">
              <span class="card-price fw-bold">${Utils.formatTien(sp.gia)}</span>
              ${sp.giaCu ? `<br><span class="card-price-old">${Utils.formatTien(sp.giaCu)}</span>` : ''}
            </div>
          </div>
        </div>
      </div>`;
  },

  /** Render tóm tắt giỏ hàng trong header modal */
  renderMiniCart() {
    const ds = GioHang.layDanhSach();
    const container = document.getElementById('mini-cart-items');
    const tongEl = document.getElementById('mini-cart-tong');
    if (!container) return;

    if (ds.length === 0) {
      container.innerHTML = '<p class="text-center text-muted py-4">Giỏ hàng của bạn đang trống</p>';
      if (tongEl) tongEl.textContent = Utils.formatTien(0);
      return;
    }

    container.innerHTML = ds.map(item => `
      <div class="mini-cart-item d-flex border-bottom pb-3 mb-3">
        <div class="me-3" style="flex-shrink:0;width:60px;">
          <img src="${item.anh}" class="img-fluid rounded" alt="${item.ten}">
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <h5 class="fs-7 fw-semibold mb-1">${item.ten}</h5>
            <button class="btn-xoa-mini-gio border-0 bg-transparent" data-key="${item.key}" aria-label="Xóa ${item.ten}"><svg class="sl-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
          </div>
          <small class="text-muted">Size: ${item.size} | ${item.mauSac}</small>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <span class="text-muted">x${item.soLuong}</span>
            <span class="fw-bold">${Utils.formatTien(item.gia * item.soLuong)}</span>
          </div>
        </div>
      </div>`).join('');

    if (tongEl) tongEl.textContent = Utils.formatTien(GioHang.tinhTamTinh());

    // Gán sự kiện xóa trong mini cart
    container.querySelectorAll('.btn-xoa-mini-gio').forEach(btn => {
      btn.addEventListener('click', () => {
        GioHang.xoa(btn.dataset.key);
        UI.renderMiniCart();
      });
    });
  },

  /** Gán sự kiện toàn trang */
  ganSuKienChung() {
    // Sự kiện thêm vào giỏ từ card sản phẩm
    document.addEventListener('click', (e) => {
      const btnThem = e.target.closest('.btn-them-gio');
      if (btnThem) {
        const id = btnThem.dataset.id;
        const sp = Utils.laySanPham(id);
        if (sp) {
          // Thêm với size đầu tiên có sẵn và màu đầu tiên
          const size = sp.size[0];
          const mau = sp.mauSac[0];
          GioHang.them(id, size, mau, 1);
          UI.renderMiniCart();
        }
      }
    });

    // Sự kiện form đăng nhập
    const formDangNhap = document.getElementById('form-dang-nhap');
    if (formDangNhap) {
      formDangNhap.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = formDangNhap.querySelector('[name="email"]').value;
        const mk = formDangNhap.querySelector('[name="matkhau"]').value;
        const ket = NguoiDung.dangNhap(email, mk);
        const loiEl = document.getElementById('loi-dang-nhap');
        if (ket.ok) {
          const modal = bootstrap.Modal.getInstance(document.getElementById('modallogin'));
          if (modal) modal.hide();
          Utils.hienToast(`Chào mừng trở lại, ${ket.nguoi.ten}!`, 'success');
        } else {
          if (loiEl) loiEl.textContent = ket.loi;
        }
      });
    }

    // Sự kiện form đăng ký
    const formDangKy = document.getElementById('form-dang-ky');
    if (formDangKy) {
      formDangKy.addEventListener('submit', (e) => {
        e.preventDefault();
        const ten = formDangKy.querySelector('[name="ten"]').value;
        const email = formDangKy.querySelector('[name="email"]').value;
        const mk = formDangKy.querySelector('[name="matkhau"]').value;
        const ket = NguoiDung.dangKy(ten, email, mk);
        const loiEl = document.getElementById('loi-dang-ky');
        if (ket.ok) {
          const modal = bootstrap.Modal.getInstance(document.getElementById('modallogin'));
          if (modal) modal.hide();
          Utils.hienToast('Đăng ký thành công! Chào mừng bạn đến ShoesLish!', 'success');
        } else {
          if (loiEl) loiEl.textContent = ket.loi;
        }
      });
    }

    // Sự kiện đăng xuất
    document.querySelectorAll('.btn-dang-xuat').forEach(btn => {
      btn.addEventListener('click', () => NguoiDung.dangXuat());
    });

    // Cập nhật mini cart khi mở modal giỏ hàng
    const modalGio = document.getElementById('modallong');
    if (modalGio) {
      modalGio.addEventListener('show.bs.modal', () => UI.renderMiniCart());
    }
  },
};

// ============================================================
// KHỞI ĐỘNG ỨNG DỤNG
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Cập nhật badge giỏ hàng
  GioHang.capNhatBadge();

  // Cập nhật UI header theo trạng thái đăng nhập
  NguoiDung.capNhatUIHeader();

  // Gán sự kiện chung
  UI.ganSuKienChung();

  // Ẩn preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => { preloader.style.display = 'none'; }, 400);
    }, 500);
  }
});

// Export để các module khác dùng (nếu cần)
window.ShoesLish = { CONFIG, DANH_SACH_SAN_PHAM, GioHang, NguoiDung, DonHang, TimKiem, UI, Utils };
