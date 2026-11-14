const CORE = {
  signOfCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  creed: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead.\n\nI believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  ourFather: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  hailMary: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.\n\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  gloryBe: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
  fatima: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy. Amen.",
  hailHolyQueen: "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.",
  rosaryClosing: "Let us pray. O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.\n\nIn the name of the Father, and of the Son, and of the Holy Spirit. Amen."
};

const DAILY_SLOTS = {
  morning: {
    title: "Morning Offering",
    text: "O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day for all the intentions of Your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, in reparation for my sins, for the intentions of all our associates, and in particular for the intentions of our Holy Father. Amen."
  },
  angelus: {
    title: "The Angelus",
    text: "V. The Angel of the Lord declared unto Mary.\nR. And she conceived of the Holy Spirit.\n(Hail Mary...)\n\nV. Behold the handmaid of the Lord.\nR. Be it done unto me according to thy word.\n(Hail Mary...)\n\nV. And the Word was made flesh.\nR. And dwelt among us.\n(Hail Mary...)\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray. Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the incarnation of Christ, Thy Son, was made known by the message of an angel, may by His passion and cross be brought to the glory of His resurrection, through the same Christ our Lord. Amen."
  },
  night: {
    title: "Night Examen & Prayer",
    text: "Pause quietly in God's presence:\n1. Thank God for three specific blessings from today.\n2. Ask the Holy Spirit for light to see where you fell short.\n3. Tell God you are sorry and ask His grace for tomorrow.\n\nVisit, we beseech Thee, O Lord, this habitation, and drive far from it all snares of the enemy; let Thy holy angels dwell herein to preserve us in peace, and let Thy blessing be always upon us. Through Christ our Lord. Amen.\n\nMay the almighty and merciful Lord, Father, Son, and Holy Spirit, bless and keep us. Amen."
  }
};

const MYSTERIES = {
  joyful: {
    name: "The Joyful Mysteries", days: "Mondays & Saturdays",
    decades: [
      { title: "1. The Annunciation", fruit: "Fruit: Humility — Mary says 'yes' to God's plan." },
      { title: "2. The Visitation", fruit: "Fruit: Love of Neighbour — Mary hastens to serve Elizabeth." },
      { title: "3. The Nativity", fruit: "Fruit: Poverty of Spirit — Jesus is born in Bethlehem." },
      { title: "4. The Presentation", fruit: "Fruit: Obedience — Mary and Joseph offer Jesus in the Temple." },
      { title: "5. Finding Jesus in the Temple", fruit: "Fruit: Joy in Finding Jesus — Seeking Christ above all." }
    ]
  },
  luminous: {
    name: "The Luminous Mysteries", days: "Thursdays",
    decades: [
      { title: "1. The Baptism of Jesus", fruit: "Fruit: Openness to the Holy Spirit — 'This is my beloved Son.'" },
      { title: "2. The Wedding at Cana", fruit: "Fruit: To Jesus through Mary — 'Do whatever He tells you.'" },
      { title: "3. Proclamation of the Kingdom", fruit: "Fruit: Repentance and Trust — The Gospel of mercy." },
      { title: "4. The Transfiguration", fruit: "Fruit: Desire for Holiness — Christ shines in glory." },
      { title: "5. Institution of the Eucharist", fruit: "Fruit: Adoration — 'This is My Body, given for you.'" }
    ]
  },
  sorrowful: {
    name: "The Sorrowful Mysteries", days: "Tuesdays & Fridays",
    decades: [
      { title: "1. The Agony in the Garden", fruit: "Fruit: Sorrow for Sin — 'Not my will, but Thine be done.'" },
      { title: "2. The Scourging at the Pillar", fruit: "Fruit: Purity — Christ suffers patiently for our healing." },
      { title: "3. The Crowning with Thorns", fruit: "Fruit: Moral Courage — Jesus, the humble King." },
      { title: "4. The Carrying of the Cross", fruit: "Fruit: Patience in Trials — Taking up our daily cross." },
      { title: "5. The Crucifixion", fruit: "Fruit: Perseverance & Forgiveness — 'Father, forgive them.'" }
    ]
  },
  glorious: {
    name: "The Glorious Mysteries", days: "Wednesdays & Sundays",
    decades: [
      { title: "1. The Resurrection", fruit: "Fruit: Faith — Christ is risen from the dead!" },
      { title: "2. The Ascension", fruit: "Fruit: Hope — Setting our hearts on heaven." },
      { title: "3. The Descent of the Holy Spirit", fruit: "Fruit: Love of God — Strength and fire at Pentecost." },
      { title: "4. The Assumption of Mary", fruit: "Fruit: Grace of a Happy Death — Mary taken up to glory." },
      { title: "5. The Coronation of Mary", fruit: "Fruit: Trust in Mary's Intercession — Queen of Heaven and Earth." }
    ]
  }
};

const PRAYERS_LIBRARY = [
  { title: "Our Father", category: "Essential", text: CORE.ourFather },
  { title: "Hail Mary", category: "Essential", text: CORE.hailMary },
  { title: "Glory Be", category: "Essential", text: CORE.gloryBe },
  { title: "Act of Contrition", category: "Confession & Mercy", text: "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve with the help of Thy grace to sin no more and to avoid the near occasion of sin. Amen." },
  { title: "Morning Offering", category: "Daily", text: DAILY_SLOTS.morning.text },
  { title: "The Angelus", category: "Daily", text: DAILY_SLOTS.angelus.text },
  { title: "Memorare", category: "Marian", text: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen." },
  { title: "Hail, Holy Queen", category: "Marian", text: CORE.hailHolyQueen },
  { title: "Prayer to St. Michael", category: "Protection", text: "St. Michael the Archangel, defend us in battle. Be our defence against the wickedness and snares of the Devil. May God rebuke him, we humbly pray, and do thou, O Prince of the heavenly hosts, by the power of God, thrust into hell Satan, and all the evil spirits, who prowl about the world seeking the ruin of souls. Amen." },
  { title: "Come, Holy Spirit", category: "Essential", text: "Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created. And You shall renew the face of the earth.\n\nO, God, who by the light of the Holy Spirit, did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise and ever enjoy His consolations. Through Christ Our Lord. Amen." },
  { title: "Anima Christi", category: "After Communion", text: "Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO good Jesus, hear me.\nWithin Your wounds hide me.\nSeparated from You, let me never be.\nFrom the evil one protect me.\nAt the hour of my death, call me.\nAnd close to You bid me,\nThat with Your saints I may be praising You forever and ever. Amen." },
  { title: "Grace Before Meals", category: "Daily", text: "Bless us, O Lord, and these Thy gifts, which we are about to receive from Thy bounty, through Christ our Lord. Amen." },
  { title: "Guardian Angel Prayer", category: "Daily", text: "Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen." }
];
