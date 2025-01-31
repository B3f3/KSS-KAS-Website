giris_noktasi = float(input("Giriş Noktası: "))
toplam_alim_miktari = float(input("Toplam Alım Miktarı: "))
guncel_fiyat = float(input("Güncel Fiyat: "))

class KSSKAS:
    def __init__(self, giris_noktasi, toplam_alim_miktari, guncel_fiyat):
        self.giris_noktasi = giris_noktasi
        self.toplam_alim_miktari = toplam_alim_miktari
        self.guncel_fiyat = guncel_fiyat

    def maliyet(self):
        return self.giris_noktasi * self.toplam_alim_miktari

strateji = KSSKAS(giris_noktasi, toplam_alim_miktari, guncel_fiyat)
print(f"Maliyet: {strateji.maliyet()}")