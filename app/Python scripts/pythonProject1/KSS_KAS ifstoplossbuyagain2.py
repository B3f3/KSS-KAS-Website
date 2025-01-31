# Kullanım
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

    class TekrarAlim:
        def __init__(self, parent):
            self.parent = parent

        def tekrar_alim_noktasi(self):
            return self.parent.giris_noktasi * 0.6

        def tekrar_alim_miktari(self):
            return self.parent.stoptan_gelen_tutar() / self.tekrar_alim_noktasi()

        def ortalama_giris_noktasi(self):
            return (self.parent.giris_noktasi + self.tekrar_alim_noktasi()) / 2

        def son_miktar(self):
            return self.tekrar_alim_miktari() + (self.parent.toplam_alim_miktari / 2)

    def get_tekrar_alim(self):
        return self.TekrarAlim(self)

strateji = KSS_KAS(giris_noktasi, toplam_alim_miktari, guncel_fiyat)
tekrar_alim = strateji.get_tekrar_alim()

print(f"Maliyet: {strateji.maliyet()}")
print(f"Stop Noktası: {strateji.stop_noktasi()}")
print(f"Stop Miktarı: {strateji.stop_miktari()}")
print(f"Stopdan Gelen Tutar: {strateji.stoptan_gelen_tutar()}")
print(f"Tekrar Alım Noktası: {tekrar_alim.tekrar_alim_noktasi()}")
print(f"Tekrar Alım Miktarı: {tekrar_alim.tekrar_alim_miktari()}")
print(f"Ortalama Giriş Noktası: {tekrar_alim.ortalama_giris_noktasi()}")
print(f"Son Miktar: {tekrar_alim.son_miktar()}")
