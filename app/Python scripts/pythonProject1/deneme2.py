giris_noktasi = float(input("Giriş Noktası: "))
alim_miktari = float(input("Toplam Alım Miktarı: "))
guncel_fiyat = float(input("Güncel Fiyat: "))
yeni_fiyat =float(input("Yeni Fiyat: "))
son_fiyat = float(input("Son Fiyat: "))


class KoinIslemleri:
    def __init__(self, baslangic_fiyati, alim_miktari):
        self.giris_noktasi = giris_noktasi
        self.guncel_fiyat = guncel_fiyat
        self.alim_miktari = alim_miktari
        self.holding = alim_miktari
        self.nakit = 0

    def zarar_durdur(self):
        zarar_durdur_fiyati = self.giris_noktasi * 0.925
        if self.guncel_fiyat <= zarar_durdur_fiyati:
            satis_miktari = self.holding / 2
            self.holding -= satis_miktari
            self.nakit += satis_miktari * self.guncel_fiyat
            print(f"Zarar Durdur tetiklendi: {satis_miktari} birim {self.guncel_fiyat} fiyatından satıldı")

    def guncel_fiyat_guncelle(self, yeni_fiyat):
        self.guncel_fiyat = yeni_fiyat
    def yeniden_al(self):
        yeniden_al_fiyati = self.giris_noktasi * 0.6
        if self.guncel_fiyat <= yeniden_al_fiyati:
            alim_miktari = self.nakit / self.giris_noktasi * 0.6
            self.holding += alim_miktari
            self.nakit = 0
            print(f"Yeniden Alım: {alim_miktari} birim {self.guncel_fiyat} fiyatından alındı")

    def ortalama_birim_fiyati(self):
        toplam_deger = (self.alim_miktari * self.giris_noktasi + self.nakit) / self.alim_miktari
        return toplam_deger / self.holding if self.holding != 0 else 0

    def guncel_fiyat_guncelle(self, son_fiyat):
        self.guncel_fiyat = son_fiyat

    def kar_al(self):
        kar_al_fiyati = self.ortalama_birim_fiyati() * 1.3
        if self.guncel_fiyat >= kar_al_fiyati:
            satis_miktari = self.holding * 0.1
            self.holding -= satis_miktari
            self.nakit += satis_miktari * self.guncel_fiyat
            print(f"Kar Al tetiklendi: {satis_miktari} birim {self.guncel_fiyat} fiyatından satıldı")

    def durum(self):
        print(f"Güncel Fiyat: {self.guncel_fiyat}")
        print(f"Toplam Miktar: {self.holding}")
        print(f"Ortalama Birim Fiyatı: {self.ortalama_birim_fiyati()}")
        print(f"Nakit: {self.nakit}")

# Örnek kullanım
koin = KoinIslemleri(1, 1000)
koin.guncel_fiyat_guncelle(0.9)
koin.zarar_durdur()
koin.guncel_fiyat_guncelle(0.35)
koin.yeniden_al()
koin.guncel_fiyat_guncelle(0.4)
koin.kar_al()
koin.durum()
