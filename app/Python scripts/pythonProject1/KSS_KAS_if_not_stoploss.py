giris_noktasi = float(input("Giriş Noktası: "))
toplam_alim_miktari = float(input("Toplam Alım Miktarı: "))
guncel_fiyat = float(input("Güncel Fiyat: "))

class KSSKAS:
    def __init__(self, giris_noktasi, toplam_alim_miktari, guncel_fiyat):
        self.giris_noktasi = giris_noktasi
        self.toplam_alim_miktari = toplam_alim_miktari
        self.guncel_fiyat = guncel_fiyat
        self.kar_alim_miktari_30 = 0
        self.kar_alim_miktari_50 = 0
        self.kar_alim_miktari_80 = 0
        self.kar_alim_miktari_120 = 0
        self.kar_alim_miktari_150 = 0
    def maliyet(self):
        return self.giris_noktasi * self.toplam_alim_miktari

    def ilk_kar_alim_noktasi_30(self):
        if self.guncel_fiyat >= self.giris_noktasi * 1.3:
            self.kar_alim_miktari_30 = (self.toplam_alim_miktari * 0.1) * (self.giris_noktasi * 1.3)
            return self.kar_alim_miktari_30
        else:
            return 0

    def ikinci_kar_alim_noktasi_50(self):
        if self.guncel_fiyat >= self.giris_noktasi * 1.5:
            self.kar_alim_miktari_50 = (self.toplam_alim_miktari * 0.1) * (self.giris_noktasi * 1.5)
            return self.kar_alim_miktari_50
        else:
            return 0

    def ucuncu_kar_alim_noktasi_80(self):
        if self.guncel_fiyat >= (self.giris_noktasi * 1.8):
            self.kar_alim_miktari_80 = (self.toplam_alim_miktari * 0.1) * (self.giris_noktasi * 1.8)
            return self.kar_alim_miktari_80
        else:
            return 0
    def dorduncu_kar_alim_noktasi_120(self):
        if self.guncel_fiyat >= (self.giris_noktasi * 2.2):
            self.kar_alim_miktari_120 = (self.toplam_alim_miktari * 0.1) * (self.giris_noktasi * 2.2)
            return self.kar_alim_miktari_120
        else:
            return 0

    def besinci_kar_alim_noktasi_150(self):
        if self.guncel_fiyat >= (self.giris_noktasi * 2.5):
            self.kar_alim_miktari_150 = (self.toplam_alim_miktari * 0.1) * (self.giris_noktasi * 2.5)
            return self.kar_alim_miktari_150
        else:
            return 0


    def kalan_miktar(self):
        kalan = self.toplam_alim_miktari
        if self.guncel_fiyat >= self.giris_noktasi * 1.3:
            kalan -= self.toplam_alim_miktari * 0.1
        if self.guncel_fiyat >= self.giris_noktasi * 1.5:
            kalan -= self.toplam_alim_miktari * 0.1
        if self.guncel_fiyat >= self.giris_noktasi * 1.8:
            kalan -= self.toplam_alim_miktari * 0.1
        if self.guncel_fiyat >= self.giris_noktasi * 2.2:
            kalan -= self.toplam_alim_miktari * 0.1
        if self.guncel_fiyat >= self.giris_noktasi * 2.5:
            kalan -= self.toplam_alim_miktari * 0.1
        return kalan

    def toplam_kar_alimi(self):
        return (self.kar_alim_miktari_30 + self.kar_alim_miktari_50 + self.kar_alim_miktari_80 +
                self.kar_alim_miktari_120 + self.kar_alim_miktari_150)

strateji = KSSKAS(giris_noktasi, toplam_alim_miktari, guncel_fiyat)

print(f"Maliyet: {strateji.maliyet()}")
print(f"İlk Kar Alım Noktası: {strateji.ilk_kar_alim_noktasi_30()}")
print(f"İkinci Kar Alım Noktası: {strateji.ikinci_kar_alim_noktasi_50()}")
print(f"Üçüncü Kar Alım Noktası: {strateji.ucuncu_kar_alim_noktasi_80()}")
print(f"Dördüncü Kar Alım Noktası: {strateji.dorduncu_kar_alim_noktasi_120()}")
print(f"Beşinci Kar Alım Noktası: {strateji.besinci_kar_alim_noktasi_150()}")
print(f"Toplam Kar Alımı: {strateji.toplam_kar_alimi()}")
print(f"Kalan Miktar: {strateji.kalan_miktar()}")