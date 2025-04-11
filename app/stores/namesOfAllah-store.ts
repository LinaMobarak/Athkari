import { create } from 'zustand';

export type NameOfAllah = {
    id: number
    text: string
    color: string
    description: string
}

export type NamesOfAllahStore = {
    namesOfAllah: NameOfAllah[]
}
const useNamesOfAllahStore = create<NamesOfAllahStore>((set) => ({
    namesOfAllah: [
        { "id": 1, "text": "الله", "color": "#c5e3e9", "description": "الاسم الذي يدلّ على ذات الله -تعالى- الجامعة لصفات ألوهيّته." },
        { "id": 2, "text": "الرحمن", "color": "#d8e9c5", "description": "الاسم الذي يدلّ على شمول رحمته كافّة خَلقه؛ بأن خلقهم ورزقهم، وهو اسم يختص به الله -تعالى- ولا يجوز أن يُطلَق على أحد غيره." },
        { "id": 3, "text": "الرحيم", "color": "#b1bace", "description": "اسم خاصّ برحمة الله -تعالى- بعباده المؤمنين؛ بهدايتهم للإيمان وإثابتهم الثواب الدائم في الآخرة." },
        { "id": 4, "text": "الملك", "color": "#d7ccc8", "description": "الملك لغة هو الشدّ والربط فيُقال: ملكت العجين؛ أي شددت عجنه، فالملك هو الذي يكون الأمر في ملكه يعود له، وهو أعمّ من المالك فليس كل مالك أمره نافذ في ملكه، والله -تعالى- مالك المالكين لأنّ تصرفهم في أملاكهم ما كان إلّا بإذنه." },
        { "id": 5, "text": "القدوس", "color": "#ffe0b2", "description": "المُنزّه عن كل ما يُمكن أن يُدركه حسّ الإنسان أو خياله من الأوصاف." },
        { "id": 6, "text": "السلام", "color": "#fff9c4", "description": "السالم من جميع العيوب والصفات الناقصة، وهو الذي يعمّم السلامة على خلقه." },
        { "id": 7, "text": "المؤمن", "color": "#f8bbd0", "description": "المُصدِّق لجميع ما تقوله نفسه وكتبه ورسله عنه." },
        { "id": 8, "text": "المهيمن", "color": "#c8e6c9", "description": "المُسيطر بقدرته الكاملة على كل شيء." },
        { "id": 9, "text": "العزيز", "color": "#d1c4e9", "description": "الغالب الذي لا نظير ولا مثيل له." },
        { "id": 10, "text": "الجبار", "color": "#ffccbc", "description": "المُنفِّذ بطريق الإجبار والجبر لمشيئته وإرادته في كلّ ما يريد." },
        { "id": 11, "text": "المتكبر", "color": "#bbdefb", "description": "المُتفرِّد بجميع صفات الكبرياء والعظمة، المُترفِّع عن الحاجة والنقص." },
        { "id": 12, "text": "الخالق", "color": "#cfd8dc", "description": "المُبدِع في خلقه، وذلك بإرادته." },
        { "id": 13, "text": "البارئ", "color": "#ffe0b2", "description": "المُميِّز للمخلوقين حتّى مع اختلاف صورهم." },
        { "id": 14, "text": "المصور", "color": "#f0f4c3", "description": "المعطي لكلّ خلقٍ من خلقه صورة مختلفة عن الأخرى." },
        { "id": 15, "text": "الغفار", "color": "#f8bbd0", "description": " الذي يغفر في الدنيا وبالآخرة." },
        { "id": 16, "text": "القهار", "color": "#c5cae9", "description": "الذي قهر كل شيء وغلبه." },
        { "id": 17, "text": "الوهاب", "color": "#dcedc8", "description": "المنعم على عباده، فهو كثير النعم ودائم العطاء." },
        { "id": 18, "text": "الرزاق", "color": "#ffe0b2", "description": "الذي يرزق جميع خلقه." },
        { "id": 19, "text": "الفتاح", "color": "#bbdefb", "description": "الذي يفتح أبواب الرزق والرحمة." },
        { "id": 20, "text": "العليم", "color": "#cfd8dc", "description": "الذي لا يخفى عليه شيء في الأرض ولا في السماء." },
        { "id": 21, "text": "القابض", "color": "#ffe0b2", "description": "الذي يقبض الرزق والأرواح." },
        { "id": 22, "text": "الباسط", "color": "#f0f4c3", "description": "الذي يبسط الرزق والرحمة." },
        { "id": 23, "text": "الخافض", "color": "#f8bbd0", "description": "الذي يخفض ويذل من يشاء." },
        { "id": 24, "text": "الرافع", "color": "#c5cae9", "description": "رافع السماوات السبع، وهو أيضا رافع عباده المؤمنين بالطاعات وناصرهم على أعدائهم." },
        { "id": 25, "text": "المعز", "color": "#dcedc8", "description": "الذي يعز من يشاء." },
        { "id": 26, "text": "المذل", "color": "#ffe0b2", "description": "الذي يذل من يشاء." },
        { "id": 27, "text": "السميع", "color": "#bbdefb", "description": "الذي يسمع كل شيء." },
        { "id": 28, "text": "البصير", "color": "#f0f4c3", "description": "المحيط بكل شيء علما، فهو يرى جميع الأشياء ظاهرها وباطنها" },
        { "id": 29, "text": "الحكم", "color": "#f8bbd0", "description": "الذي يحكم بين عباده بالعدل." },
        { "id": 30, "text": "العدل", "color": "#c5cae9", "description": "الذي لا يجور على أحدٍ من خلقه، بل هو العادل في حكمه." },
        { "id": 31, "text": "اللطيف", "color": "#dcedc8", "description": "الذي يُحسن إلى عباده بلطفه ورحمته." },
        { "id": 32, "text": "الخبير", "color": "#f0f4c3", "description": "الذي يعلم سرّ عباده وجهرهم، فلا يخفى عليه شيء." },
        { "id": 33, "text": "الحليم", "color": "#f8bbd0", "description": "الصبور، وهو من يمهل ولا يهمل" },
        { "id": 34, "text": "العظيم", "color": "#c5cae9", "description": "الذي لا شيء أعظم منه، في ذاته وصفاته." },
        { "id": 35, "text": "الغفور", "color": "#dcedc8", "description": "الذي يغفر الذنوب ويستر العيوب." },
        { "id": 36, "text": "الشكور", "color": "#ffe0b2", "description": "لذي ينعم على جميع عباده بالثواب ويقبل كافة الأعمال بل ويضاعف من أجرها." },
        { "id": 37, "text": "العلي", "color": "#bbdefb", "description": "الذي علا بذاته فوق جميع خلقه." },
        { "id": 38, "text": "الكبير", "color": "#f0f4c3", "description": "نزه نفسه وذاته عن أية أوهام فعظمته لا مثيل لها" },
        { "id": 39, "text": "الحفيظ", "color": "#f8bbd0", "description": "الذي يحفظ عباده من كل سوء." },
        { "id": 40, "text": "المقيت", "color": "#c5cae9", "description": "من يخلق قوت كل العباد ويقسمها عدلاً. المقيت شرعاً: قد فسره أهل العلم بعدّة معان ومنها: الحسيب، الحفيظ، الشهيد، القدير" },
        { "id": 41, "text": "الحسيب", "color": "#dcedc8", "description": "الذي يحاسب عباده على أعمالهم." },
        { "id": 42, "text": "الجليل", "color": "#ffe0b2", "description": "الذي له الجلال والعظمة." },
        { "id": 43, "text": "الكريم", "color": "#bbdefb", "description": "الذي له الكرم والجود." },
        { "id": 44, "text": "الرقيب", "color": "#f0f4c3", "description": "الذي يراقب عباده ويعلم أحوالهم." },
        { "id": 45, "text": "المجيب", "color": "#f8bbd0", "description": "الذي يستجيب لدعاء عباده." },
        { "id": 46, "text": "الواسع", "color": "#c5cae9", "description": "الذي وسعت رحمته كل شيء." },
        { "id": 47, "text": "الحكيم", "color": "#dcedc8", "description": "الذي لا يفعل إلا ما هو حكيم." },
        { "id": 48, "text": "الودود", "color": "#ffe0b2", "description": "الذي يحب عباده المؤمنين." },
        { "id": 49, "text": "المجيد", "color": "#bbdefb", "description": "الذي له المجد والكمال." },
        { "id": 50, "text": "الباعث", "color": "#f0f4c3", "description": "الذي يبعث الخلائق بعد موتهم." },
        { "id": 51, "text": "الشهيد", "color": "#f8bbd0", "description": "الحاضر دائما، والذي لا يغيب عنه شيء؛ فهو مطلع على جميع المشاهد عليم بتفاصيلها." },
        { "id": 52, "text": "الحق", "color": "#c5cae9", "description": "الذي هو الحق المبين، وكل شيء سواه باطل." },
        { "id": 53, "text": "الوكيل", "color": "#dcedc8", "description": "الذي يكفي عباده ما أهمهم." },
        { "id": 54, "text": "القوي", "color": "#ffe0b2", "description": "الذي لا يعجزه شيء، ذو القوة المتين." },
        { "id": 55, "text": "المتين", "color": "#bbdefb", "description": "الذي لا يتزعزع ولا يتغير." },
        { "id": 56, "text": "الولي", "color": "#f0f4c3", "description": "الذي يتولى أمر عباده ويرعاهم." },
        { "id": 57, "text": "الحميد", "color": "#f8bbd0", "description": "الذي يستحق الحمد والثناء." },
        { "id": 58, "text": "المحصي", "color": "#c5cae9", "description": "الذي يحصي كل شيء ويعلمه." },
        { "id": 59, "text": "المبدئ", "color": "#dcedc8", "description": "الذي يبدأ الخلق ثم يعيده." },
        { "id": 60, "text": "المعيد", "color": "#ffe0b2", "description": "الذي يعيد الخلق بعد فنائهم." },
        { "id": 61, "text": "المحيي", "color": "#bbdefb", "description": "الذي يحيي الموتى ويبعثهم." },
        { "id": 62, "text": "المميت", "color": "#f0f4c3", "description": "الذي يميت الخلائق بقدرته." },
        { "id": 63, "text": "الحي", "color": "#f8bbd0", "description": "الذي له الحياة الكاملة الأبدية." },
        { "id": 64, "text": "القيوم", "color": "#c5cae9", "description": "الذي يقوم على كل شيء ويدبره. وفي تفسير اخر: الغني عن غيره، القائم بنفسه." },
        { "id": 65, "text": "الواجد", "color": "#dcedc8", "description": "الذي يجد كل شيء، فلا يفقد شيئًا." },
        { "id": 66, "text": "الماجد", "color": "#ffe0b2", "description": "الذي له المجد والكرم." },
        { "id": 67, "text": "الواحد", "color": "#bbdefb", "description": "الذي لا شريك له، فردٌ صمد"},
        { "id": 68, "text": "الصمد", "color": "#f0f4c3", "description": "فسر بمعنيين عند العلماء: أحدهما: أنه الذي لا جوف له، ليس من جنس المخلوقين، المخلوق له جوف يأكل ويشرب ويطعم، والله لا جوف له مصمت. وفسر الصمد بمعنى آخر: وهو أنه تصمد إليه الخلائق في حاجاتها، وترجوه، وتسأله، وتضرع إليه في حاجاتها سبحانه، وكله حق، هو الصمد لا جوف له، وهو الصمد ترفع إليه الحاجات" },
        { "id": 69, "text": "القادر", "color": "#f8bbd0", "description": "الذي له القدرة التامة على كل شيء." },
        { "id": 70, "text": "المقتدر", "color": "#c5cae9", "description": "هو أبلغ من القدير، ويجمع دلالات القادر والقدير معًا، ويشير إلى التمكن الكامل مع الهيمنة والإحكام، فلا يمتنع عليه شيء" },
        { "id": 71, "text": "المقدم", "color": "#dcedc8", "description": "الذي يقدم من يشاء برحمته ويؤخر من يشاء بحكمته." },
        { "id": 72, "text": "المؤخر", "color": "#ffe0b2", "description": "الذي يؤخر من يشاء بحكمته ويقدم من يشاء برحمته." },
        { "id": 73, "text": "الأول", "color": "#bbdefb", "description": "الذي ليس قبله شيء، وهو بداية كل شيء." },
        { "id": 74, "text": "الآخر", "color": "#f0f4c3", "description": "الذي ليس بعده شيء، وهو نهاية كل شيء." },
        { "id": 75, "text": "الظاهر", "color": "#f8bbd0", "description": "الذي تجلّت آياته وبديع صنعه في كل شيء." },
        { "id": 76, "text": "الباطن", "color": "#c5cae9", "description": "الذي يعلم سرّ كل شيء، ولا يخفى عليه شيء." },
        { "id": 77, "text": "الوالي", "color": "#dcedc8", "description": "الذي يتولى أمر خلقه برحمته وحكمته." },
        { "id": 78, "text": "المتعالي", "color": "#ffe0b2", "description": "الذي تعالَت ذاته عن مشابهة المخلوقات." },
        { "id": 79, "text": "البر", "color": "#bbdefb", "description": "الذي هو مصدر كل خير ورحمة لعباده." },
        { "id": 80, "text": "التواب", "color": "#f0f4c3", "description": "الذي يقبل توبة عباده ويغفر لهم." },
        { "id": 81, "text": "المنتقم", "color": "#f8bbd0", "description": "الذي ينتقم من أعدائه ويجازيهم على أعمالهم." },
        { "id": 82, "text": "العفو", "color": "#c5cae9", "description": "الذي يعفو عن ذنوب عباده ويغفر لهم." },
        { "id": 83, "text": "الرؤوف", "color": "#dcedc8", "description": "الذي يتصف برحمة عظيمة بعباده." },
        { "id": 84, "text": "مالك الملك", "color": "#ffe0b2", "description": "الذي يملك الملك كله، ولا شريك له في ملكه." },
        { "id": 85, "text": "ذو الجلال والإكرام", "color": "#bbdefb", "description": "الذي له الجلال في عظمته، والإكرام في عطائه." },
        { "id": 86, "text": "المقسط", "color": "#f0f4c3", "description": "الذي يوزّع عطاياه بميزان العدل." },
        { "id": 87, "text": "الجامع", "color": "#f8bbd0", "description": "الذي يجمع الخلائق ليوم الحساب." },
        { "id": 88, "text": "الغني", "color": "#c5cae9", "description": "الذي لا يحتاج إلى شيء، وكل شيء فقير إليه." },
        { "id": 89, "text": "المغني", "color": "#dcedc8", "description": "الذي يغني عباده من فضله ورحمته." },
        { "id": 90, "text": "المانع", "color": "#ffe0b2", "description": "الذي يمنع ما يشاء، ويمنح ما يشاء." },
        { "id": 91, "text": "الضار", "color": "#bbdefb", "description": "الذي يضرّ من يشاء بحكمته وعدله." },
        { "id": 92, "text": "النافع", "color": "#f0f4c3", "description": "الذي ينفع عباده بما يشاء من خير." },
        { "id": 93, "text": "النور", "color": "#f8bbd0", "description": "الذي هو نور السموات والأرض، يهدي من يشاء." },
        { "id": 94, "text": "الهادي", "color": "#c5cae9", "description": "الذي يهدي عباده إلى الصراط المستقيم." },
        { "id": 95, "text": "البديع", "color": "#dcedc8", "description": "الذي خلق الخلق بديعًا دون مثال سابق." },
        { "id": 96, "text": "الباقي", "color": "#ffe0b2", "description": "الذي لا يفنى ولا يبيد، وكل شيء هالك إلا وجهه." },
        { "id": 97, "text": "الوارث", "color": "#bbdefb", "description": "الذي يرث الأرض ومن عليها، ويبقى وجهه." },
        { "id": 98, "text": "الرشيد", "color": "#f0f4c3", "description": "من يرشد من يشاء ويسعده، ويشقي من يشاء بعدم إرشاده، فهو بالغ الرشاد والحكمة." },
        { "id": 99, "text": "الصبور", "color": "#f8bbd0", "description": "الذي لا يعجل عقوبته لعباده، بل يمهلهم." }
    ],
}))

export default useNamesOfAllahStore