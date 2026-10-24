// [ar, fr, en, [correct, wrong, wrong, wrong]]  (options are shuffled at runtime)
export const QZ=[
["أي خاصية توسّط عناصر flex عموديًا (في صف)؟","Quelle propriété centre verticalement les éléments flex (en ligne) ?","Which property centers flex items vertically (in a row)?",["align-items:center","justify-content:center","text-align:center","vertical-align:flex"]],
["كيف تضيف مسافة بين عناصر flex أو grid؟","Comment espacer les éléments flex ou grid ?","How do you add space between flex or grid items?",["gap:10px","margin:gap","spacing:10px","flex-space:10px"]],
["ثلاثة أعمدة متساوية في grid:","Trois colonnes égales en grid :","Three equal columns in grid:",["grid-template-columns:repeat(3,1fr)","grid-columns:3","columns:3 grid","display:grid-3"]],
["عنصر يُوضع نسبةً لأقرب أب له position:","Élément placé par rapport au plus proche parent positionné :","Element placed relative to the nearest positioned ancestor:",["position:absolute","position:fixed","position:static","float:absolute"]],
["الوحدة rem تعتمد على:","L’unité rem dépend de :","The rem unit is based on:",[":root{font-size}","parent{font-size}","100vw","100%"]],
["لتغيير ناعم عند hover:","Pour un changement doux au survol :","For a smooth change on hover:",["transition:all .3s","animation-play:hover","transform:smooth","hover-speed:.3s"]],
["لملء صورة داخل صندوق دون تشويه:","Remplir une image dans une boîte sans déformation :","Fill an image in a box without distortion:",["object-fit:cover","image-fit:fill","img-size:cover","background-fit:cover"]],
["حجم خط مرن بين حد أدنى وأقصى:","Taille de police fluide entre un min et un max :","Fluid font size between a min and a max:",["clamp(14px,4vw,22px)","between(14px,22px)","range(14px,4vw,22px)","fluid(14px,22px)"]],
["محدّد الأبناء المباشرين فقط:","Sélecteur des enfants directs uniquement :","Selector for direct children only:",["nav > a","nav a","nav + a","nav ~ a"]],
["لكي يشمل العرض الحشو والحد:","Pour inclure le padding et la bordure dans la largeur :","To include padding and border in the width:",["box-sizing:border-box","box-sizing:content-box","width:inner","padding:inside"]],
["تعريف متغير CSS:","Définir une variable CSS :","Define a CSS custom property:",["--main:#0f6","$main:#0f6","@main:#0f6","var main:#0f6"]],
["تنسيق الأب بحسب ابنه:","Styliser le parent selon son enfant :","Style a parent based on its child:",[".card:has(.new)",".card < .new",".card:parent(.new)",".new:up(.card)"]]
];
