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
        { id: 21, text: 'البصير', color: '#ffe0b2', description: 'الذي لا يخفى عليه شيء في الأرض ولا في السماء.' },
        { id: 22, text: 'الحكم', color: '#f0f4c3', description: 'الحاكم الذي لا يُحكم عليه، وهو الذي يُحكم بين عباده بالعدل.' },
        { id: 23, text: 'العدل', color: '#f8bbd0', description: 'الذي لا يجور على أحدٍ من خلقه، بل هو العادل في حكمه.' },
        { id: 24, text: 'اللطيف', color: '#c5cae9', description: 'الذي يُحسن إلى عباده بلطفه ورحمته.' },
        { id: 25, text: 'الخبير', color: '#dcedc8', description: 'العليم بأسرار الأمور وخفاياها.' },
        { id: 26, text: 'الحليم', color: '#ffe0b2', description: 'المُؤخِّر للعقوبة عن المذنبين إلى وقتٍ آخر.' },
        { id: 27, text: 'العظيم', color: '#bbdefb', description: 'العظيم الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 28, text: 'الغفور', color: '#cfd8dc', description: 'المُغفِر لذنوب عباده، وهو الذي يستر العيوب ويعفو عن الذنوب.' },
        { id: 29, text: 'الشّكور', color: '#ffe0b2', description: 'المُثيب لعباده على أعمالهم الصالحة، وهو الذي يُثيبهم عليها.' },
        { id: 30, text: 'الكبير', color: '#f0f4c3', description: 'الكبير الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 31, text: 'الحفيظ', color: '#f8bbd0', description: 'المُحافظ على عباده من كلّ سوءٍ وشرّ، وهو الذي يحفظهم من كلّ ما يُؤذيهم.' },
        { id: 32, text: 'المقيت', color: '#c5cae9', description: 'المُقيت الذي يُعطي كلّ مخلوقٍ ما يحتاجه من الرزق.' },
        { id: 33, text: 'الحسيب', color: '#dcedc8', description: 'الكافي لعباده، وهو الذي يُحاسبهم على أعمالهم.' },
        { id: 34, text: 'الجليل', color: '#ffe0b2', description: 'الذي له صفات الجلال والكمال، وهو الذي لا يُشبهه شيءٌ من خلقه.' },
        { id: 35, text: 'الكريم', color: '#bbdefb', description: 'الذي يُعطي عباده ما يحتاجونه من الرزق والكرامة.' },
        { id: 36, text: 'الرقيب', color: '#cfd8dc', description: 'المُراقب لأعمال عباده، وهو الذي لا يخفى عليه شيءٌ من خلقه.' },
        { id: 37, text: 'المجيب', color: '#ffe0b2', description: 'المُجيب لدعاء عباده، وهو الذي يستجيب لهم في كلّ وقتٍ وحين.' },
        { id: 38, text: 'الواسع', color: '#f0f4c3', description: 'الذي وسعت رحمته كلّ شيء، وهو الذي يُعطي عباده ما يحتاجونه من الرزق والكرامة.' },
        { id: 39, text: 'الحكيم', color: '#f8bbd0', description: 'العليم بأسرار الأمور وخفاياها، وهو الذي يُحسن إلى عباده بلطفه ورحمته.' },
        { id: 40, text: 'الودود', color: '#c5cae9', description: 'المحبّ لعباده، وهو الذي يُحبّهم ويُحبّونه.' },
        { id: 41, text: 'المجيد', color: '#dcedc8', description: 'العظيم الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 42, text: 'الباعث', color: '#ffe0b2', description: 'المُحيي للموتى، وهو الذي يُعيدهم إلى الحياة بعد الموت.' },
        { id: 43, text: 'الشّهد', color: '#bbdefb', description: 'المُشاهد لكلّ شيءٍ، وهو الذي لا يخفى عليه شيءٌ من خلقه.' },
        { id: 44, text: 'الحق', color: '#cfd8dc', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 45, text: 'الوكيل', color: '#ffe0b2', description: 'المُوكَّل بأمور عباده، وهو الذي يُدبّر شؤونهم.' },
        { id: 46, text: 'القوي', color: '#f0f4c3', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 47, text: 'المتين', color: '#f8bbd0', description: 'المُتين الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 48, text: 'الوليّ', color: '#c5cae9', description: 'المُعين لعباده، وهو الذي يُساعدهم في كلّ ما يحتاجونه.' },
        { id: 49, text: 'الحمد', color: '#dcedc8', description: 'الحمد لله -تعالى- على كلّ نعمةٍ أنعم بها على عباده، وهو الذي يستحقّ الحمد والثناء.' },
        { id: 50, text: 'المحصي', color: '#ffe0b2', description: 'المُحصي لأعمال عباده، وهو الذي يُحاسبهم على أعمالهم.' },
        { id: 51, text: 'المبدئ', color: '#bbdefb', description: 'المُبدِع لكلّ شيءٍ، وهو الذي يُنشئ الأشياء من العدم.' },
        { id: 52, text: 'المعيد', color: '#cfd8dc', description: 'المُعيد لكلّ شيءٍ إلى أصله، وهو الذي يُعيد الأشياء إلى حالتها الأصلية بعد التغيير.' },
        { id: 53, text: 'المحيي', color: '#ffe0b2', description: 'المُحيي للموتى، وهو الذي يُعيدهم إلى الحياة بعد الموت.' },
        { id: 54, text: 'المميت', color: '#f0f4c3', description: 'المُميت لكلّ شيءٍ، وهو الذي يُميت الأشياء بعد الحياة.' },
        { id: 55, text: 'الحيّ', color: '#f8bbd0', description: 'الذي لا يموت، وهو الذي له صفات الحياة الأبدية.' },
        { id: 56, text: 'القيوم', color: '#c5cae9', description: 'الذي يقوم على كلّ شيءٍ، وهو الذي يُدبّر شؤون عباده.' },
        { id: 57, text: 'الواجد', color: '#dcedc8', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 58, text: 'الماجد', color: '#ffe0b2', description: 'العظيم الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 59, text: 'الواحِد', color: '#bbdefb', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 60, text: 'الاحد', color: '#cfd8dc', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 61, text: 'الصمد', color: '#ffe0b2', description: 'الذي لا يحتاج إلى أحدٍ من خلقه، وهو الذي يُعطي كلّ مخلوقٍ ما يحتاجه من الرزق والكرامة.' },
        { id: 62, text: 'القادر', color: '#f0f4c3', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 63, text: 'المُقدِّر', color: '#f8bbd0', description: 'المُقدِّر لكلّ شيءٍ، وهو الذي يُحدّد مقادير الأشياء.' },
        { id: 64, text: 'المُقيت', color: '#c5cae9', description: 'المُقيت الذي يُعطي كلّ مخلوقٍ ما يحتاجه من الرزق.' },
        { id: 65, text: 'الفتاح', color: '#dcedc8', description: 'المُفتِح لكلّ شيءٍ، وهو الذي يُفتح له كلّ شيءٍ مغلق.' },
        { id: 66, text: 'العليم', color: '#ffe0b2', description: 'الذي لا يخفى عليه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 67, text: 'الحكيم', color: '#bbdefb', description: 'العليم بأسرار الأمور وخفاياها، وهو الذي يُحسن إلى عباده بلطفه ورحمته.' },
        { id: 68, text: 'الخبير', color: '#cfd8dc', description: 'العليم بأسرار الأمور وخفاياها، وهو الذي يُحسن إلى عباده بلطفه ورحمته.' },
        { id: 69, text: 'المُقيت', color: '#ffe0b2', description: 'المُقيت الذي يُعطي كلّ مخلوقٍ ما يحتاجه من الرزق.' },
        { id: 70, text: 'الحسيب', color: '#f0f4c3', description: 'الكافي لعباده، وهو الذي يُحاسبهم على أعمالهم.' },
        { id: 71, text: 'الجليل', color: '#f8bbd0', description: 'الذي له صفات الجلال والكمال، وهو الذي لا يُشبهه شيءٌ من خلقه.' },
        { id: 72, text: 'الكريم', color: '#c5cae9', description: 'الذي يُعطي عباده ما يحتاجونه من الرزق والكرامة.' },
        { id: 73, text: 'الرقيب', color: '#dcedc8', description: 'المُراقب لأعمال عباده، وهو الذي لا يخفى عليه شيءٌ من خلقه.' },
        { id: 74, text: 'المجيب', color: '#ffe0b2', description: 'المُجيب لدعاء عباده، وهو الذي يستجيب لهم في كلّ وقتٍ وحين.' },
        { id: 75, text: 'الواسع', color: '#bbdefb', description: 'الذي وسعت رحمته كلّ شيء، وهو الذي يُعطي عباده ما يحتاجونه من الرزق والكرامة.' },
        { id: 76, text: 'الحكيم', color: '#cfd8dc', description: 'العليم بأسرار الأمور وخفاياها، وهو الذي يُحسن إلى عباده بلطفه ورحمته.' },
        { id: 77, text: 'الودود', color: '#ffe0b2', description: 'المحبّ لعباده، وهو الذي يُحبّهم ويُحبّونه.' },
        { id: 78, text: 'المجيد', color: '#f0f4c3', description: 'العظيم الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 79, text: 'الباعث', color: '#f8bbd0', description: 'المُحيي للموتى، وهو الذي يُعيدهم إلى الحياة بعد الموت.' },
        { id: 80, text: 'الشّهد', color: '#c5cae9', description: 'المُشاهد لكلّ شيءٍ، وهو الذي لا يخفى عليه شيءٌ من خلقه.' },
        { id: 81, text: 'الحق', color: '#dcedc8', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 82, text: 'الوكيل', color: '#ffe0b2', description: 'المُوكَّل بأمور عباده، وهو الذي يُدبّر شؤونهم.' },
        { id: 83, text: 'القوي', color: '#bbdefb', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 84, text: 'المتين', color: '#cfd8dc', description: 'المُتين الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 85, text: 'الوليّ', color: '#ffe0b2', description: 'المُعين لعباده، وهو الذي يُساعدهم في كلّ ما يحتاجونه.' },
        { id: 86, text: 'الحمد', color: '#f0f4c3', description: 'الحمد لله -تعالى- على كلّ نعمةٍ أنعم بها على عباده، وهو الذي يستحقّ الحمد والثناء.' },
        { id: 87, text: 'المحصي', color: '#f8bbd0', description: 'المُحصي لأعمال عباده، وهو الذي يُحاسبهم على أعمالهم.' },
        { id: 88, text: 'المبدئ', color: '#c5cae9', description: 'المُبدِع لكلّ شيءٍ، وهو الذي يُنشئ الأشياء من العدم.' },
        { id: 89, text: 'المعيد', color: '#dcedc8', description: 'المُعيد لكلّ شيءٍ إلى أصله، وهو الذي يُعيد الأشياء إلى حالتها الأصلية بعد التغيير.' },
        { id: 90, text: 'المحيي', color: '#ffe0b2', description: 'المُحيي للموتى، وهو الذي يُعيدهم إلى الحياة بعد الموت.' },
        { id: 91, text: 'المميت', color: '#bbdefb', description: 'المُميت لكلّ شيءٍ، وهو الذي يُميت الأشياء بعد الحياة.' },
        { id: 92, text: 'الحيّ', color: '#cfd8dc', description: 'الذي لا يموت، وهو الذي له صفات الحياة الأبدية.' },
        { id: 93, text: 'القيوم', color: '#ffe0b2', description: 'الذي يقوم على كلّ شيءٍ، وهو الذي يُدبّر شؤون عباده.' },
        { id: 94, text: 'الواجد', color: '#f0f4c3', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 95, text: 'الماجد', color: '#f8bbd0', description: 'العظيم الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 96, text: 'الواحِد', color: '#c5cae9', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 97, text: 'الاحد', color: '#dcedc8', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
        { id: 98, text: 'الصمد', color: '#ffe0b2', description: 'الذي لا يحتاج إلى أحدٍ من خلقه، وهو الذي يُعطي كلّ مخلوقٍ ما يحتاجه من الرزق والكرامة.' },
        { id: 99, text: 'القادر', color: '#bbdefb', description: 'الذي لا يُشبهه شيءٌ من خلقه، وهو الذي له صفات العظمة والكبرياء.' },
    ],
}))

export default useNamesOfAllahStore