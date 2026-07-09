
// Force Login Check
(function() {
    var currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html'; // root path
        if (currentPage === 'login.html') {
        if (localStorage.getItem('token')) {
            window.location.href = 'index.html';
        }
    }
    if (currentPage !== 'login.html') {
        if (!localStorage.getItem('token') || !localStorage.getItem('currentUser')) {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    }
})();

// --- Language Setup ---
(function() {
    var lang = localStorage.getItem('site_language');
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        // Add font
        var link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        
        var style = document.createElement('style');
        style.textContent = `
            body, h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea {
                font-family: 'Cairo', sans-serif !important;
            }
            .material-symbols-outlined {
                font-family: 'Material Symbols Outlined' !important;
                direction: ltr !important;
            }
            nav {
                direction: ltr !important;
            }
            header {
                direction: ltr !important;
            }
        `;
        document.head.appendChild(style);
    }
})();

// Inject Dictionary and apply translations
(function() {
    var dict = {
        'Home': 'الرئيسية',
        'Shop': 'التسوق',
        'Cart': 'السلة',
        'Profile': 'حسابي',
        'Search products...': 'ابحث عن المنتجات...',
        'Categories': 'الأقسام',
        'Discover Our Categories': 'اكتشف أقسامنا',
        'Carefully selected Ghiras Alkhier collections': 'مجموعات غراس الخير المختارة بعناية',
        'Loading categories...': 'جاري تحميل الأقسام...',
        'No categories currently available.': 'لا توجد أقسام متاحة حالياً.',
        'Bring Nature Home': 'اجلب الطبيعة لمنزلك',
        'Cultivate your personal sanctuary with our curated collection of resilient, beautiful houseplants and organic care essentials designed for modern living.': 'اصنع ملاذك الشخصي مع مجموعتنا المختارة من النباتات المنزلية الجميلة ومستلزمات العناية العضوية المصممة للحياة العصرية.',
        'Shop the Collection': 'تسوق المجموعة',
        'Popular Plants': 'نباتات شائعة',
        'View All': 'عرض الكل',
        'Add to Cart': 'أضف للسلة',
        'Checkout': 'الدفع',
        'My Garden': 'حديقتي',
        'Admin Dashboard': 'لوحة الإدارة',
        'Account Settings': 'إعدادات الحساب',
        'My Information': 'معلوماتي',
        'Saved Addresses': 'العناوين المحفوظة',
        'Language / اللغة': 'Language / اللغة',
        'Plant your first seed today!': 'ازرع بذورك الأولى اليوم!',
        'See All': 'عرض الكل',
        'Loading your garden...': 'جاري تحميل حديقتك...',
        'Logout': 'تسجيل الخروج',
        'My Orders': 'طلباتي',
        'Log Out': 'تسجيل خروج',
        'Delete Account': 'حذف الحساب',
        
        'Edit Profile': 'تعديل الحساب',
        'Tap to change picture': 'اضغط لتغيير الصورة',
        'Full Name': 'الاسم الكامل',
        'Your full name': 'اسمك الكامل',
        'Email Address': 'البريد الإلكتروني',
        'Phone Number': 'رقم الهاتف',
        'Gender': 'الجنس',
        'Select': 'اختر',
        'Male': 'ذكر',
        'Female': 'أنثى',
        'Set Account Password': 'تعيين كلمة مرور للحساب',
        'Enter new password (optional)': 'أدخل كلمة مرور جديدة (اختياري)',
        'Since you signed in with Google, you can set a password to also log in using your email directly.': 'نظراً لأنك سجلت الدخول باستخدام جوجل، يمكنك تعيين كلمة مرور لتسجيل الدخول عبر بريدك الإلكتروني مباشرة.',
        'Save Changes': 'حفظ التعديلات',
        'Remove Photo?': 'حذف الصورة؟',
        'Are you sure you want to remove your custom profile photo and revert to the default avatar?': 'هل أنت متأكد من حذف صورتك الشخصية والعودة للصورة الافتراضية؟',
        'Cancel': 'إلغاء',
        'Remove': 'حذف',
        
        'Update your profile': 'تحديث حسابك',
        'My Information': 'بياناتي الشخصية',
        'ACCOUNT SETTINGS': 'إعدادات الحساب',
        'Plant your first seed today!': 'ازرع بذرتك الأولى اليوم!',
        '!Plant your first seed today': 'ازرع بذرتك الأولى اليوم!',
        'Your Garden is Empty': 'حديقتك فارغة',
        'Every great garden starts with a single seed. Buy a plant and watch your garden grow here!': 'كل حديقة عظيمة تبدأ ببذرة واحدة. اشترِ نبتة وشاهد حديقتك تنمو هنا!',
        '!grow here': 'كل حديقة عظيمة تبدأ ببذرة واحدة. اشترِ نبتة وشاهد حديقتك تنمو هنا!',
        'Every great garden starts with a single seed. Buy a plant and watch your garden': 'كل حديقة عظيمة تبدأ ببذرة واحدة. اشترِ نبتة وشاهد حديقتك تنمو هنا!',
        'Start Growing': 'ابدأ الزراعة',
        'No orders yet': 'لا توجد طلبات بعد',
        'Your order history will appear here.': 'سجل طلباتك سيظهر هنا.',
        'Your order history will appear here': 'سجل طلباتك سيظهر هنا.',
        '.Your order history will appear here': 'سجل طلباتك سيظهر هنا.',
        'Start Shopping': 'ابدأ التسوق',
        'Pending': 'قيد الانتظار',
        'Processing': 'قيد التجهيز',
        'On the Way': 'في الطريق',
        'Completed': 'مكتمل',
        'Cancelled': 'ملغي',
        'Delivery Address': 'عنوان التوصيل',
        'Unnamed Address': 'عنوان غير مسمى',
        'Store Pickup': 'استلام من المتجر',
        'Total Amount': 'المبلغ الإجمالي',
        
        'Search for plants or care tools...': 'ابحث عن نباتات أو أدوات عناية...',
        'Discover Our Categories': 'اكتشف أقسامنا',
        'Carefully selected Ghiras Alkhier collections': 'تشكيلات غراس الخير المختارة بعناية',
        'All Plants and Products': 'جميع النباتات والمنتجات',
        'Clear Filter': 'مسح الفلتر',
        'Ghiras Alkhier': 'غراس الخير',
        '© 2024 Ghiras Alkhier. Botanical Clarity for your Home.': '© 2024 غراس الخير. نقاء نباتي لمنزلك.',
        'c 2024 Ghiras Alkhier. Botanical Clarity for your Home.': '© 2024 غراس الخير. نقاء نباتي لمنزلك.',
        'Here are your current account details.': 'هذه هي تفاصيل حسابك الحالي.',
        'My Information': 'بياناتي الشخصية',
        
        'We couldn\'t find any products matching your search.': 'لم نتمكن من العثور على أي منتجات تطابق بحثك.',
        'We couldn\'t find any products matching your search': 'لم نتمكن من العثور على أي منتجات تطابق بحثك.',
        '.We couldn\'t find any products matching your search': 'لم نتمكن من العثور على أي منتجات تطابق بحثك.',
        'Bring Nature Home': 'اجلب الطبيعة إلى منزلك',
        'Cultivate your personal sanctuary with our curated collection of resilient, beautiful houseplants and organic care essentials designed for modern living.': 'ازرع ملاذك الشخصي مع مجموعتنا المختارة من النباتات المنزلية المرنة والجميلة ومستلزمات العناية العضوية المصممة للحياة العصرية.',
        'Cultivate your personal sanctuary with our curated collection of resilient, beautiful': 'ازرع ملاذك الشخصي مع مجموعتنا المختارة من النباتات المنزلية المرنة والجميلة ومستلزمات العناية العضوية المصممة للحياة العصرية.',
        '.houseplants and organic care essentials designed for modern living': 'ازرع ملاذك الشخصي مع مجموعتنا المختارة من النباتات المنزلية المرنة والجميلة ومستلزمات العناية العضوية المصممة للحياة العصرية.',
        'Shop the Collection': 'تسوق المجموعة',
        
        'Botanical Clarity for your Home. We believe in the restorative power of nature, brought indoors with mindful design and sustainable practices.': 'وضوح نباتي لمنزلك. نؤمن بالقوة التصالحية للطبيعة، ونجلبها إلى الداخل بتصميم واعٍ وممارسات مستدامة.',
        'Botanical Clarity for your Home. We believe in the restorative power of nature, brought indoors': 'وضوح نباتي لمنزلك. نؤمن بالقوة التصالحية للطبيعة، ونجلبها إلى الداخل بتصميم واعٍ وممارسات مستدامة.',
        '.with mindful design and sustainable practices': 'وضوح نباتي لمنزلك. نؤمن بالقوة التصالحية للطبيعة، ونجلبها إلى الداخل بتصميم واعٍ وممارسات مستدامة.',
        'Company': 'الشركة',
        'About Us': 'من نحن',
        'Contact': 'اتصل بنا',
        'Explore': 'استكشف',
        'Shop All': 'تسوق الكل',
        'Plant Care': 'العناية بالنباتات',
        
        'Manage Products': 'إدارة المنتجات',
        'No products found.': 'لا توجد منتجات.',
        'No products found': 'لا توجد منتجات.',
        '.No products found': 'لا توجد منتجات.',
        
        'Manage Categories': 'إدارة الأقسام',
        'CATEGORY NAME': 'اسم القسم',
        'e.g. Indoor Plants': 'مثال: نباتات داخلية',
        'CATEGORY NAME (ARABIC)': 'اسم القسم (بالعربية)',
        'CATEGORY IMAGE': 'صورة القسم',
        'Click to upload image': 'اضغط لرفع صورة',
        'PNG, JPG or WEBP (Max 2MB)': 'PNG، JPG أو WEBP (الحد الأقصى 2MB)',
        'Add Category': 'إضافة قسم',
        
        'Manage Orders': 'إدارة الطلبات',
        '...Search by Order ID': '...ابحث برقم الطلب',
        'Current': 'الحالية',
        'Delivered': 'المكتملة',
        'Cancelled': 'الملغاة',
        'No orders found matching your criteria.': 'لا توجد طلبات تطابق بحثك.',
        'No orders found matching your criteria': 'لا توجد طلبات تطابق بحثك.',
        '.No orders found matching your criteria': 'لا توجد طلبات تطابق بحثك.',
        'No orders found': 'لا توجد طلبات',
        'You have no active orders.': 'ليس لديك طلبات نشطة.',
        'You have no completed orders.': 'ليس لديك طلبات مكتملة.',
        'You have no cancelled orders.': 'ليس لديك طلبات ملغاة.',
        
        'Products': 'المنتجات',
        'Orders': 'الطلبات',
        'Users': 'المستخدمين',
        
        'Your Cart': 'سلة المشتريات',
        'Your cart is empty': 'سلتك فارغة',
        'Apply': 'تطبيق',
        'Promo Code': 'رمز الخصم',
        'Subtotal': 'المجموع الفرعي',
        'Total': 'المجموع الإجمالي',
        'Proceed to Checkout': 'متابعة الدفع',
        
        'Delivery Address': 'عنوان التوصيل',
        'Address': 'العنوان',
        'Payment': 'الدفع',
        'Select Delivery Address': 'اختر عنوان التوصيل',
        'No addresses found. Add one below.': 'لا توجد عناوين. أضف عنواناً بالأسفل.',
        'No addresses found. Add one below': 'لا توجد عناوين. أضف عنواناً بالأسفل.',
        '.No addresses found. Add one below': 'لا توجد عناوين. أضف عنواناً بالأسفل.',
        'Add New Address': 'إضافة عنوان جديد',
        'Continue to Payment': 'المتابعة للدفع',
        
        'New Address': 'عنوان جديد',
        'Address Details': 'تفاصيل العنوان',
        'Address Name *': 'اسم العنوان *',
        'Building Number / Name *': 'رقم / اسم المبنى *',
        'Extra Details': 'تفاصيل إضافية',
        'Floor / Apt': 'الطابق / الشقة',
        '(Optional)': '(اختياري)',
        'Add Address': 'إضافة العنوان',
        'Sorry, out of stock!': '!عذراً، نفدت الكمية',
        'Sorry, this product is currently out of stock!': '!عذراً، هذا المنتج غير متوفر حالياً',
        'Out of Stock': 'نفدت الكمية',
        
        'My Addresses': 'عناويني',
        '+ Add New': '+ إضافة جديد',
        
        'Clear Cart': 'إفراغ السلة',
        'Order Summary': 'ملخص الطلب',
        'Shipping': 'الشحن',
        'Payment Method': 'طريقة الدفع',
        'Cash on Delivery': 'الدفع عند الاستلام',
        'Pay when you receive your order': 'ادفع عند استلام طلبك',
        'Pickup': 'استلام من المتجر',
        'Pick up from our store': 'استلم طلبك من متجرنا',
        'Personal Details': 'التفاصيل الشخصية',
        'Edit': 'تعديل',
        'Total Amount': 'المبلغ الإجمالي',
        'Place Order': 'تأكيد الطلب',
        'Change': 'تغيير',
        'CONTACT INFO / معلومات التواصل': 'معلومات التواصل',
        'Contact Info / معلومات التواصل': 'معلومات التواصل',
        'CONTACT INFO': 'معلومات التواصل',
        'Address Name *': 'اسم العنوان *',
        'Building Number / Name *': 'رقم / اسم المبنى *',
        'each': 'للقطعة',
        'JOD': 'د.أ',
        'Log Out': 'تسجيل الخروج',
        'Are you sure?': 'هل أنت متأكد؟',
        'Do you really want to log out of your account?': 'هل تريد حقاً تسجيل الخروج من حسابك؟',
        'Yes': 'نعم',
        'No': 'لا',
        'Delete Account': 'حذف الحساب',
        'Delete Account?': 'حذف الحساب؟',
        'This action cannot be undone. All your orders, saved addresses, and garden data will be': 'لا يمكن التراجع عن هذا الإجراء. جميع طلباتك وعناوينك وبيانات حديقتك سيتم ',
        'deleted': 'حذفها',
        'Confirm Password': 'تأكيد كلمة المرور',
        'Enter your password': 'أدخل كلمة المرور',
        'Cancel': 'إلغاء',
        'Delete': 'حذف',
        'Confirm Your Order': 'تأكيد طلبك',
        'Are you sure you want to place this order? You can track it from your profile once confirmed.': 'هل أنت متأكد من رغبتك في إتمام الطلب؟ يمكنك تتبع حالة الطلب من ملفك الشخصي لاحقاً.',
        'Yes, Place Order': 'نعم، إتمام الطلب',
        'Select Delivery Address': 'اختر عنوان التوصيل',
        'Delivery Address': 'عنوان التوصيل',
        'Please select a delivery address first': 'الرجاء اختيار عنوان التوصيل أولاً',
        'Please log in to place an order': 'الرجاء تسجيل الدخول لإتمام الطلب',
        'Please select a payment method': 'الرجاء اختيار طريقة الدفع'
    };
    
    window.t = function(text) {
        if (localStorage.getItem('site_language') === 'ar') {
            return dict[text] || text;
        }
        return text;
    };

    window.applyTranslations = function() {
        if (localStorage.getItem('site_language') !== 'ar') return;
        
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walk.nextNode()) {
            const original = node.nodeValue.trim();
            if (dict[original]) {
                node.nodeValue = node.nodeValue.replace(original, dict[original]);
            }
        }
        
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder').trim();
            if (dict[placeholder]) {
                input.setAttribute('placeholder', dict[placeholder]);
            }
        });
    };
    
    window.getLangField = function(item, field) {
        if (!item) return '';
        var isArabic = localStorage.getItem('site_language') === 'ar';
        var val = item[field];
        if (isArabic) {
            var arField = field + '_ar';
            if (item[arField] && item[arField].trim() !== '') {
                val = item[arField];
            } else {
                // Support camelCase too (e.g. nameAr)
                var camelArField = field + 'Ar';
                if (item[camelArField] && item[camelArField].trim() !== '') {
                    val = item[camelArField];
                }
            }
        }
        return val || '';
    };
    
    document.addEventListener('DOMContentLoaded', function() {
        applyTranslations();
    });
})();

// First Time Language Selector Modal
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('login.html')) return; // Don't show on login page
    
    if (!localStorage.getItem('site_language')) {
        var modalHtml = `
            <div id="language-modal" style="position: fixed; inset: 0; z-index: 100000; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
                <div style="background: white; border-radius: 24px; padding: 32px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                    <div style="width: 80px; height: 80px; background: #fbf9f8; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                        <span class="material-symbols-outlined" style="font-size: 40px; color: #135c38;">language</span>
                    </div>
                    <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #1a1a1a;">Choose Language</h2>
                    <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 24px; color: #1a1a1a; font-family: 'Cairo', sans-serif;">اختر اللغة</h2>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button onclick="setLanguage('ar')" style="background: #135c38; color: white; border: none; border-radius: 12px; padding: 16px; font-size: 18px; font-weight: bold; cursor: pointer; font-family: 'Cairo', sans-serif; transition: background 0.3s;">العربية</button>
                        <button onclick="setLanguage('en')" style="background: #fbf9f8; color: #1a1a1a; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; font-size: 18px; font-weight: bold; cursor: pointer; transition: background 0.3s;">English</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
});

window.setLanguage = function(lang) {
    localStorage.setItem('site_language', lang);
    window.location.reload();
};

// Global Loader - Only shows if page takes more than 500ms to load
(function() {
    var loaderShown = false;
    var pageLoaded = false;

    // Inject loader CSS + HTML
    var style = document.createElement('style');
    style.textContent = `
        @keyframes loader-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        #global-loader {
            position: fixed; inset: 0; z-index: 99999;
            background: #fbf9f8;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden;
            transition: opacity 0.4s ease;
        }
        #global-loader.visible { opacity: 1; visibility: visible; }
        #global-loader .loader-ring {
            width: 100px; height: 100px; border-radius: 50%;
            border: 3px solid rgba(19, 92, 56, 0.12);
            border-top: 3px solid #135c38;
            animation: loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
    `;
    document.head.appendChild(style);

    var loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.innerHTML = `
    <div style="position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;">
        <div class="loader-ring"></div>
        <svg width="12" height="16" viewBox="0 0 18 22" fill="none" style="position:absolute;top:-5px;left:50%;margin-left:-6px;"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.9"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="10" height="14" viewBox="0 0 18 22" fill="none" style="position:absolute;top:1px;right:8px;transform:rotate(30deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.75"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="13" height="17" viewBox="0 0 18 22" fill="none" style="position:absolute;top:12px;right:-2px;transform:rotate(60deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.85"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="11" height="15" viewBox="0 0 18 22" fill="none" style="position:absolute;right:-6px;top:50%;margin-top:-7px;transform:rotate(90deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.8"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="10" height="14" viewBox="0 0 18 22" fill="none" style="position:absolute;bottom:12px;right:-2px;transform:rotate(120deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.7"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="12" height="16" viewBox="0 0 18 22" fill="none" style="position:absolute;bottom:1px;right:8px;transform:rotate(150deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.65"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="11" height="15" viewBox="0 0 18 22" fill="none" style="position:absolute;bottom:-5px;left:50%;margin-left:-5px;transform:rotate(180deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.8"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="10" height="14" viewBox="0 0 18 22" fill="none" style="position:absolute;bottom:1px;left:8px;transform:rotate(210deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.7"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="13" height="17" viewBox="0 0 18 22" fill="none" style="position:absolute;bottom:12px;left:-2px;transform:rotate(240deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.85"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="11" height="15" viewBox="0 0 18 22" fill="none" style="position:absolute;left:-6px;top:50%;margin-top:-7px;transform:rotate(270deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.8"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="10" height="14" viewBox="0 0 18 22" fill="none" style="position:absolute;top:12px;left:-2px;transform:rotate(300deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.7"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
        <svg width="12" height="16" viewBox="0 0 18 22" fill="none" style="position:absolute;top:1px;left:8px;transform:rotate(330deg);"><path d="M9 0C9 0 0 6 0 14C0 18.4 4 22 9 22C14 22 18 18.4 18 14C18 6 9 0 9 0Z" fill="#135c38" opacity="0.75"/><path d="M9 6V18M9 10C7 10 5 12 5 14" stroke="#bcebd2" stroke-width="1.2" stroke-linecap="round"/></svg>
    </div>`;

    var showTimer;
    
    // We must wait for DOMContentLoaded because script is in <head> and document.body is null
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertBefore(loader, document.body.firstChild);
        
        // Only show loader if page takes more than 500ms to load
        showTimer = setTimeout(function() {
            if (!pageLoaded) {
                loader.classList.add('visible');
                loaderShown = true;
            }
        }, 500);
    });

    function hideLoader() {
        pageLoaded = true;
        clearTimeout(showTimer);
        if (loaderShown) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 400);
        } else {
            loader.remove();
        }
    }

    window.addEventListener('load', hideLoader);
})();

// Visitor Tracking
(async function() {
    // console.log('🚀 Tracker script initialized...');
    try {
        let fpId = localStorage.getItem('visitor_fingerprint');
        if (!fpId) {
            fpId = 'fp_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('visitor_fingerprint', fpId);
        }

        let ipAddress = 'Unknown';
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            ipAddress = ipData.ip;
            // console.log('🌍 IP Fetched:', ipAddress);
        } catch (error) {
            // console.error('⚠️ Could not fetch IP', error);
        }

        const payload = {
            fingerprintId: fpId,
            page: window.location.pathname.split('/').pop() || 'index.html',
            userAgent: navigator.userAgent,
            ipAddress: ipAddress
        };

        const webhookUrl = 'https://script.google.com/macros/s/AKfycbxjXQ8qxvnZWVn5Mk3C8sJv9IAijNj7DoVmDvaZ11pfjpCQHlNQzFnFWJ8qauhiCSW2/exec';
        
        // console.log('📤 Sending data to Google Sheets...', payload);

        // navigator.sendBeacon is highly reliable for tracking data and bypasses strict CORS preflights
        const success = navigator.sendBeacon(webhookUrl, JSON.stringify(payload));
        
        if (success) {
            // console.log('✅ Tracking request successfully queued by browser.');
        } else {
            // console.warn('⚠️ sendBeacon failed, trying standard fetch...');
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            }); // .then(() => console.log('✅ Fetch fallback sent.')).catch(e => console.error('❌ Fetch fallback error', e));
        }
    } catch(e) {
        // console.error('❌ Visitor tracking failed', e);
    }
})();

// Global Fetch Interceptor for JWT Authentication
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    let [resource, config] = args;
    
    const url = typeof resource === 'string' ? resource : (resource ? resource.url : '');
    
    if (url && url.includes('/api/')) {
        const token = localStorage.getItem('token');
        if (token) {
            config = config || {};
            
            // Handle different ways headers can be defined
            if (config.headers instanceof Headers) {
                if (!config.headers.has('Authorization')) {
                    config.headers.append('Authorization', `Bearer ${token}`);
                }
            } else {
                config.headers = config.headers || {};
                if (!config.headers['Authorization'] && !config.headers['authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }
            args[1] = config; // Update the args array
        }
    }
    
    const response = await originalFetch(...args);
    
    // Global 401 Unauthorized handling
    if (response.status === 401 && url.includes('/api/') && !url.includes('/api/auth/')) {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        if (!window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
    
    return response;
};
