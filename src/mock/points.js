import { Price, TypesList } from '../const.js';
import { mockOffers } from './offers.js';
import {getMaxDate, getMinDate, getRandomArrayElement, getRandomPositiveInteger} from '../utils.js';

const destinations = [
  {
    id: 1,
    name: 'Мадрид',
    description: 'столица Испании, признанная одним из красивейших городов мира. И это неудивительно, ведь здесь гармонично сочетаются современная и средневековая архитектура, а парковые комплексы достойны, чтобы по их аллеям совершали променад монаршие особы. Мадрид расположен в центральной части Пиренейского полуострова. “Сердце Испании” по совместительству является административным центром одноимённых провинции и автономного сообщества.',
    photos: ['https://loremflickr.com/cache/resized/65535_52645222598_463df08994_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52991435823_f2f1eecdf2_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/5259_5425613383_dd216a7030_n_248_152_nofilter.jpg','https://loremflickr.com/cache/resized/65535_52625217858_fedbb182e4_n_248_152_nofilter.jpg']
  },
  {
    id: 2,
    name: 'Лондон',
    description: 'столица Великобритании и один из величайших городов истории и современности. В Вестминстере работает правительство, здесь же расположены Букингемский дворец, самые лучшие национальные галереи, музеи, театры и клубы. Лондон бесконечно меняется: из римской, а затем раннесредневековой крепости он превратился в крупный город. После Великого лондонского пожара 1666 года он в буквальном смысле слова восстал из пепла, удивляя всех зданиями в стиле барокко. В георгианскую эпоху в нем воплотилась мечта об элегантности, в годы правления королевы Виктории он стал олицетворением Британской империи. В наши дни это крупный финансовый центр.',
    photos: ['https://loremflickr.com/cache/resized/65535_52575323256_dbc5095b99_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/7475_15936933836_9ef9d38db1_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52647565652_c31402ba91_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52976649508_295b57dfc1_n_248_152_nofilter.jpg']
  },
  {
    id: 3,
    name: 'Лиссабон',
    description: 'столица Португалии, отправная точка в маршрутах легендарных мореплавателей и один из старейших городов планеты, расположенный в устье реки Тежу, в 15 км от Атлантического океана. Главная отличительная черта Лиссабона – потрясающая гармоничность облика, которую нечасто встретишь в местах с таким выдающимся и без преувеличения славным прошлым. Оранжевые крыши жилых домов, берберийские орнаменты на стенах и современные здания бизнес-центров здесь не только не контрастируют с объектами готической, барочной и мануэлинской архитектуры, но и вносят приятное разнообразие в общую картину.',
    photos: ['https://loremflickr.com/cache/resized/65535_53111129648_00ae992d22_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52881933813_93af6a6d25_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52514733237_86b300a521_n_248_152_nofilter.jpg']
  },
  {
    id: 4,
    name: 'Рейкьявик',
    description: 'столица и одна из общин Исландии, называемая также «туристическими воротами» страны. Несмотря на то, что город является самым крупным на острове, его можно обойти пешком меньше чем за день. Компактные размеры – всего 274,5 км² – не мешают Рейкьявику быть важным научным и экономическим центром. Только здесь вам представится возможность выучить один из древнейших языков мира, посетить ледяное кафе и отведать мороженое с рыбой.',
    photos: ['https://loremflickr.com/cache/resized/65535_51822267216_d2b93aee6d_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_51730503845_247fd7bb4f_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52929564425_b220de8060_248_152_nofilter.jpg']
  },
  {
    id: 5,
    name: 'Хельсинки',
    description: 'столица Финляндии, политический, научный и культурный центр страны. Этот неповторимый, разнообразный, интригующий город способен удивить даже тех, кто хорошо его знает. Причин приехать в Хельсинки может быть огромное количество: насладиться тишиной и свежим воздухом в эпицентре городской жизни, полюбоваться архитектурой в стиле модерн, увидеть северное сияние, попариться в знаменитой финской сауне, – но результат непременно один – здешняя атмосфера навсегда поселяется в сердце.',
    photos: ['https://loremflickr.com/cache/resized/7455_10081432305_3d2d0ba0a0_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/904_39914857830_9fb6d0f9f2_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52061782505_6265b6e67b_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/65535_52916557513_f34e131ee7_n_248_152_nofilter.jpg']
  },
  {
    id: 6,
    name: 'Тенерифе',
    description: 'самый большой из Канарских островов, его площадь составляет 2045 км², а население — 700 тыс. человек. Туристов здесь ждут многочисленные достопримечательности, развлечения, интересные города. Остров делится на южное побережье с сухим климатом и золотистыми пляжами и более влажное и ветреное северное побережье, чьи черные пески под крутыми скалами напоминают о вулканическом происхождении Тенерифе. Между ними на высоту 3718 м вознесся самый высокий пик Испании — гора Тейде.',
    photos: ['https://loremflickr.com/cache/resized/65535_52688930381_dd11239c3f_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/4122_4735335277_4f946d4ec5_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/3214_2347603257_dda46f3b70_n_248_152_nofilter.jpg', 'https://loremflickr.com/cache/resized/6159_6185968474_18c313ee73_n_248_152_nofilter.jpg']
  }
];

class MockPoint {
  constructor() {
    const date1 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;
    const date2 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;

    this.id = crypto.randomUUID();
    this.type = getRandomArrayElement(TypesList);
    this.destination = getRandomArrayElement(destinations);
    this.dateFrom = getMinDate(date1, date2);
    this.dateTo = getMaxDate(date1, date2);
    this.basePrice = getRandomPositiveInteger(Price.MIN, Price.MAX);
    this.isFavorite = !!(getRandomPositiveInteger(0, 1));
    this.offers = mockOffers.get(this.type.title);
  }
}

const mockPoints = Array.from({length: getRandomPositiveInteger(1, 10)}, () => new MockPoint);

export {mockPoints};
