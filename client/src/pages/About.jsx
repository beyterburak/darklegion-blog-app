const logoImage = require('../assets/asdasd.png');

const About = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-10 px-5 flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Sol Taraf - Resim */}
            <div className="md:w-1/3 w-full flex justify-center">
                <img src={logoImage} alt="Dark Legion" className="w-full max-w-lg md:max-w-full rounded-lg shadow-lg" />
            </div>

            {/* Sağ Taraf - Yazı İçeriği */}
            <div className="md:w-2/3 w-full max-w-4xl text-left">
                <h1 className="text-4xl font-bold text-purple-950 dark:text-purple-900 mb-6 text-center md:text-left">
                    Hakkımızda - DarkLegion
                </h1>
                <p className="text-lg text-gray-700 dark:text-purple-200 leading-relaxed">
                    DarkLegion, oyun dünyasının karanlık ve derinlikli evrenlerini keşfetmeyi sevenler için hazırlanmış bir blog sitesidir. RPG'lerden FPS'lere, bağımsız yapımlardan büyük bütçeli AAA oyunlara kadar geniş bir yelpazede içerikler sunuyoruz. Amacımız, oyun dünyasına dair en güncel haberleri, detaylı incelemeleri ve özel analizleri okuyucularımıza sunarak, onların oyun deneyimini daha da derinleştirmek.
                </p>

                {/* İçerik Kartları */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Güncel Oyun Haberleri", desc: "En yeni oyun duyuruları, güncellemeler ve sektör gelişmeleri." },
                        { title: "İncelemeler", desc: "En popüler oyunların detaylı analizleri ve puanlamaları." },
                        { title: "Rehberler ve Taktikler", desc: "Zorlu oyunlarda ilerlemenizi kolaylaştıracak ipuçları ve stratejiler." },
                        { title: "Popüler Yazarlar", desc: "Oyun dünyasını tutkuyla takip eden yazarlarımızın en yeni içeriklerine ulaşabilirsiniz." }
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-200 dark:bg-purple-950 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-purple-950 dark:text-purple-700">{item.title}</h2>
                            <p className="text-gray-800 dark:text-purple-100 mt-2">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-gray-700 dark:text-purple-100 text-lg">
                    DarkLegion ekibi olarak, yalnızca yüzeysel bilgiler sunmakla kalmayıp, oyun kültürüne dair derinlemesine analizler yaparak, okuyucularımıza gerçek anlamda değerli içerikler sağlamayı hedefliyoruz. Eğer siz de oyun dünyasının bilinmeyen köşelerine yolculuk yapmak istiyorsanız, DarkLegion sizin için doğru adres!
                </p>
            </div>
        </div>
    );
};

export default About;
