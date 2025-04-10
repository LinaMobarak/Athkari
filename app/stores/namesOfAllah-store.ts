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
        { id: 1, text: 'الله', color: '#c5e3e9', description: 'الاسم الذي يدلّ على ذات الله -تعالى- الجامعة لصفات ألوهيّته.' },
        { id: 2, text: 'الرحمن', color: '#d8e9c5', description: 'الاسم الذي يدلّ على شمول رحمته كافّة خَلقه؛ بأن خلقهم ورزقهم، وهو اسم يختص به الله -تعالى- ولا يجوز أن يُطلَق على أحد غيره.' },
        { id: 3, text: 'الرحيم', color: '#b1bace', description: 'اسم خاصّ برحمة الله -تعالى- بعباده المؤمنين؛ بهدايتهم للإيمان وإثابتهم الثواب الدائم في الآخرة.' },
        { id: 4, text: 'الملك', color: '#d7ccc8', description: 'الملك لغة هو الشدّ والربط فيُقال: ملكت العجين؛ أي شددت عجنه، فالملك هو الذي يكون الأمر في ملكه يعود له، وهو أعمّ من المالك فليس كل مالك أمره نافذ في ملكه، والله -تعالى- مالك المالكين لأنّ تصرفهم في أملاكهم ما كان إلّا بإذنه.' },
        { id: 5, text: 'القدوس', color: '#ffe0b2', description: 'المُنزّه عن كل ما يُمكن أن يُدركه حسّ الإنسان أو خياله من الأوصاف.' },
        { id: 6, text: 'السلام', color: '#fff9c4', description: 'السالم من جميع العيوب والصفات الناقصة، وهو الذي يعمّم السلامة على خلقه.' },
        { id: 7, text: 'المؤمن', color: '#f8bbd0', description: 'المُصدِّق لجميع ما تقوله نفسه وكتبه ورسله عنه.' },
        { id: 8, text: 'المهيمن', color: '#c8e6c9', description: 'المُسيطر بقدرته الكاملة على كل شيء.' },
        { id: 9, text: 'العزيز', color: '#d1c4e9', description: 'الغالب الذي لا نظير ولا مثيل له' },
        { id: 10, text: 'الجبار', color: '#ffccbc', description: 'المُنفِّذ بطريق الإجبار والجبر لمشيئته وإرادته في كلّ ما يريد.' },
        { id: 11, text: 'المتكبر', color: '#bbdefb', description: 'المُتفرِّد بجميع صفات الكبرياء والعظمة، المُترفِّع عن الحاجة والنقص.' },
        { id: 12, text: 'الخالق', color: '#cfd8dc', description: 'المُبدِع في خلقه، وذلك بإرادته.' },
        { id: 13, text: 'البارئ', color: '#ffe0b2', description: 'المُميِّز للمخلوقين حتّى مع اختلاف صورهم.' },
        { id: 14, text: 'المصور', color: '#f0f4c3', description: 'المعطي لكلّ خلقٍ من خلقه صورة مختلفة عن الأخرى.' },
        { id: 15, text: 'الوليّ', color: '#f8bbd0', description: 'الناصر والمُصلح لشؤون عباده والمُثني عليهم.' },
        { id: 16, text: 'المولى', color: '#c5cae9', description: 'المالك والسيّد ومَن يُرتجى منه النصر والمعونة.' },
        { id: 17, text: 'النصير', color: '#dcedc8', description: 'النصير؛ أي المُعين على العدوّ، والله -تعالى- نصير للمؤمن.' },
        { id: 18, text: 'القريب', color: '#ffe0b2', description: 'القريب الذي ليس ببعيد، وقرب الله -تعالى- من عباده عامّ وخاصّ.' },
        { id: 19, text: 'المجيب', color: '#bbdefb', description: 'اسم فاعل من الفعل أجاب؛ فالله -تعالى- مجيبٌ لدعاء عباده.' },
        { id: 20, text: 'السميع', color: '#cfd8dc', description: 'السامع لكنّ السميع أبلغ في الصفة.' },
    ],
}))

export default useNamesOfAllahStore