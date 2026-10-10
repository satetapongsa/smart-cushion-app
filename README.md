# WAVY COMPANY — Smart Cushion Dashboard 🪑✨

เว็บแอปพลิเคชันแดชบอร์ดสำหรับเบาะนั่งอัจฉริยะ (**Smart Cushion Dashboard**) โดย **WAVY COMPANY** พัฒนาด้วย **React 19 + Vite**

![WAVY COMPANY Dashboard Preview](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/armchair.svg)

---

## ✨ ไฮไลต์ฟีเจอร์ (Key Features)

1. **📊 Real-time Pressure Distribution Heatmap**:
   - แสดงแผนผังแรงกดของกระดูกรองนั่ง (Sit bones) แบบจำลองความร้อนสด (Live Heatmap)
   - แถบชั่งน้ำหนักบาลานซ์ ซ้าย/ขวา (Left/Right Weight Split Bar)
   - วัดค่าแรงกดสูงสุด (Peak pressure in kPa)
   - เครื่องมือจำลองท่าทาง (**Simulation Mode**): สลับทดสอบ *Balanced, Leaning Left, Leaning Right, Slouching* ได้ทันที
2. **📈 Posture Trends & Analytics**:
   - กราฟแนวโน้มคะแนนท่านั่ง (Posture Trend Curve)
   - สรุปสัดส่วนท่านั่ง: Good posture (86%), Shifting (10%), Leaning (4%)
   - สลับดูมุมมอง วันนี้ (Today) / สัปดาห์ (Week)
3. **⏱️ Break & Movement Reminders**:
   - นับถอยหลังพักเบรก (Break Countdown)
   - ปุ่มกดบันทึกพักสายตา/ยืดเส้นยืดสาย (Take a break now)
   - ปรับช่วงเวลาแจ้งเตือนได้ (30, 45, 50, 60 นาที)
4. **⚙️ Hardware Controls (Wavy Cushion One)**:
   - ตรวจสอบสถานะการเชื่อมต่อบลูทูธ (Bluetooth Connected / Offline Toggle)
   - แสดงระดับแบตเตอรี่ (Battery Level 82%)
   - สวิตช์เปิด/ปิดการสั่นเตือนเมื่อนั่งเอียง (Posture Nudges Vibration)
   - ระบบตั้งค่าศูนย์เซนเซอร์ (Calibrate Cushion Wizard 3 ขั้นตอน)
5. **📄 Export Health Report**:
   - ส่งออกและดาวน์โหลดไฟล์สรุปสถิติท่านั่งวันนี้ (.txt)
6. **💡 Sitting Tips Modal**:
   - เคล็ดลับการนั่งตามหลักการยศาสตร์ (กฎ 90-90-90)

---

## 🚀 วิธีเปิดใช้งานโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ URL ที่ Vite แสดง (เช่น `http://localhost:5173`)

### 3. Build สำหรับ Production
```bash
npm run build
```

---

## 📦 วิธีนำขึ้น GitHub (Git Push Guide)

โปรเจกต์นี้ได้รับการทำ `git init` และ Commit แรกไว้เรียบร้อยแล้ว หากต้องการอัปโหลดขึ้น GitHub ของคุณ ให้ทำตามขั้นตอนนี้:

### ขั้นตอนที่ 1: สร้าง Repository ใหม่บน GitHub
1. เข้าไปที่ [GitHub.com/new](https://github.com/new)
2. ตั้งชื่อ Repository เช่น `smart-cushion-app`
3. เลือกระดับ Public หรือ Private (ไม่ต้องติ๊กสร้าง README ซ้ำ)
4. กด **Create repository**

### ขั้นตอนที่ 2: ผูก Remote และ Push ขึ้น GitHub
เปิด Terminal ในโฟลเดอร์นี้ แล้วรันคำสั่ง:

```bash
# เปลี่ยนชื่อ branch เริ่มต้นเป็น main
git branch -M main

# ผูกลิงก์ GitHub ของคุณ (แทนที่ <YOUR_USERNAME> และ <YOUR_REPO>)
git remote add origin https://github.com/<YOUR_USERNAME>/smart-cushion-app.git

# นำโค้ดขึ้น GitHub
git push -u origin main
```

---

## 🛠️ Stack & Libraries
- **React 19**
- **Vite**
- **Lucide React** (Modern Icons)
- **CSS3** (Tailored Custom Design System & CSS Variables)
