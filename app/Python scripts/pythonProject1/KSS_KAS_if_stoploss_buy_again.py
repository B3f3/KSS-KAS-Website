#Kullanım
giris_noktasi = float(input("Giriş Noktası: "))
toplam_alim_miktari = float(input("Toplam Alım Miktarı: "))
guncel_fiyat = float(input("Güncel Fiyat: "))

class KSS_KAS:
    def __init__(self, giris_noktasi, toplam_alim_miktari, guncel_fiyat):
        self.giris_noktasi = giris_noktasi
        self.toplam_alim_miktari = toplam_alim_miktari
        self.guncel_fiyat = guncel_fiyat

    def maliyet(self):
        return self.giris_noktasi * self.toplam_alim_miktari

    def stop_noktasi(self):
        return self.giris_noktasi * 0.925

    def stop_miktari(self):
        return self.toplam_alim_miktari / 2

    def stoptan_gelen_tutar(self):
        return self.stop_noktasi() * self.stop_miktari()

    def tekrar_alim_noktasi(self):
        return self.giris_noktasi * 0.6

    def tekrar_alim_miktari(self):
        return self.stoptan_gelen_tutar() / self.tekrar_alim_noktasi()

    def ortalama_giris_noktasi(self):
        return (self.giris_noktasi + self.tekrar_alim_noktasi()) / 2

    def son_miktar(self):
        return self.tekrar_alim_miktari() + (self.toplam_alim_miktari / 2)



strateji = KSS_KAS(giris_noktasi, toplam_alim_miktari, guncel_fiyat)
print(f"Maliyet: {strateji.maliyet()}")
print(f"Stop Noktası: {strateji.stop_noktasi()}")
print(f"Stop Miktarı: {strateji.stop_miktari()}")
print(f"Stopdan Gelen Tutar: {strateji.stoptan_gelen_tutar()}")
print(f"Tekrar Alım Noktası: {strateji.tekrar_alim_noktasi()}")
print(f"Tekrar Alım Miktarı: {strateji.tekrar_alim_miktari()}")
print(f"Ortalama Giriş Noktası: {strateji.ortalama_giris_noktasi()}")
print(f"Son Miktar: {strateji.son_miktar()}")