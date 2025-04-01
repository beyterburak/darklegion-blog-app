import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-10 px-5 flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Sol Taraf - İletişim Bilgileri */}
            <div className="md:w-1/3 w-full flex flex-col items-center text-center md:text-left">
                <h1 className="text-4xl font-bold text-purple-950 dark:text-purple-900 mb-6">İletişim</h1>
                <p className="text-lg text-gray-700 dark:text-purple-100 leading-relaxed">
                    Bizimle iletişime geçmek için aşağıdaki formu doldurabilir veya doğrudan e-posta yoluyla ulaşabilirsiniz.
                </p>
                <div className="mt-6 space-y-4">
                    <p className="text-gray-800 dark:text-purple-100"><strong>Email:</strong> info@darklegion.com</p>
                    <p className="text-gray-800 dark:text-purple-100"><strong>Telefon:</strong> +90 555 123 45 67</p>
                    <p className="text-gray-800 dark:text-purple-100"><strong>Adres:</strong> İstanbul, Türkiye</p>
                </div>
            </div>

            {/* Sağ Taraf - İletişim Formu */}
            <div className="md:w-2/3 w-full max-w-4xl bg-gray-200 dark:bg-purple-950 p-8 rounded-xl shadow-lg">
                <form className="flex flex-col gap-4">
                    <label className="text-gray-800 dark:text-purple-100">
                        Adınız
                        <input type="text" className="w-full p-2 mt-1 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700" required />
                    </label>
                    <label className="text-gray-800 dark:text-purple-100">
                        E-posta
                        <input type="email" className="w-full p-2 mt-1 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700" required />
                    </label>
                    <label className="text-gray-800 dark:text-purple-100">
                        Mesajınız
                        <textarea rows="4" className="w-full p-2 mt-1 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700" required></textarea>
                    </label>
                    <button type="submit" className="mt-4 bg-purple-700 text-white py-2 px-6 rounded-full hover:bg-purple-900 transition">
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;