//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const bilgiler = (obj) => {
  const {
    ülkebayrağı,
    sorgu,
    ülke,
    ülkeKodu,
    enlem,
    boylam,
    şehir,
    saatdilimi,
    parabirimi,
    isp,
  } = obj;
  return `
	<div class="card">
	<img src=${ülkebayrağı} />
	<div class="card-info">
		<h3 class="ip">${sorgu}</h3>
		<p class="ulke">${ülke} (${ülkeKodu})</p>
		<p>Enlem: ${enlem} Boylam: ${boylam}</p>
		<p>Şehir: ${şehir}</p>
		<p>Saat dilimi: ${saatdilimi}</p>
		<p>Para birimi: ${parabirimi}</p>
		<p>ISP: ${isp}</p>
	</div>
    </div>`;
};

//1) new Promise ile yapılış
// const manuelIp = () => {
//   return new Promise((resolve, reject) => {
//     resolve(`https://apis.ergineer.com/ipgeoapi/${benimIP}`);
//   });
// };

// ipAdresimiAl()
//   .then(manuelIp)
//   .then((ipp) => {
//     axios.get(`${ipp}`).then((response) => {
//       const bilgiObj = response.data;
//       document
// .querySelector(".cards")
// .insertAdjacentHTML("beforeend", bilgiler(bilgiObj));
//     });
//   })
//   .catch((err) => console.log(err));

//2) settimeout ile yapılış istenilen sürede gerçekleşmezse kod patlar bu yüzden promise/async+await kullanılıyor
// ipAdresimiAl();
// setTimeout(() => {
//   console.log(benimIP);
//   axios
//     .get(`https://apis.ergineer.com/ipgeoapi/${benimIP}`)
//     .then((response) => {
//       document
//         .querySelector(".cards")
//         .insertAdjacentHTML("beforeend", bilgiler(response.data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, 1000);

//3) direk fonsiyon ile yapılış
const sonuc = async () => {
  await ipAdresimiAl(); //bunun çalışmasını bekletmek için await
  await axios
    .get(`https://apis.ergineer.com/ipgeoapi/${benimIP}`)
    .then((response) => {
      document
        .querySelector(".cards")
        .insertAdjacentHTML("beforeend", bilgiler(response.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

sonuc();
