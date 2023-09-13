import { Price, types } from '../const.js';
import { mockOffers } from './offers.js';
import {getMaxDate, getMinDate, getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';

const destinations = [
  {
    id: 1,
    name: 'Мадрид',
    description: 'Cтолица Испании, признанная одним из красивейших городов мира. И это неудивительно, ведь здесь гармонично сочетаются современная и средневековая архитектура, а парковые комплексы достойны, чтобы по их аллеям совершали променад монаршие особы. Мадрид расположен в центральной части Пиренейского полуострова. “Сердце Испании” по совместительству является административным центром одноимённых провинции и автономного сообщества.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  },
  {
    id: 2,
    name: 'Лондон',
    description: 'Cтолица Великобритании и один из величайших городов истории и современности. В Вестминстере работает правительство, здесь же расположены Букингемский дворец, самые лучшие национальные галереи, музеи, театры и клубы. Лондон бесконечно меняется: из римской, а затем раннесредневековой крепости он превратился в крупный город. После Великого лондонского пожара 1666 года он в буквальном смысле слова восстал из пепла, удивляя всех зданиями в стиле барокко. В георгианскую эпоху в нем воплотилась мечта об элегантности, в годы правления королевы Виктории он стал олицетворением Британской империи. В наши дни это крупный финансовый центр.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  },
  {
    id: 3,
    name: 'Лиссабон',
    description: 'Cтолица Португалии, отправная точка в маршрутах легендарных мореплавателей и один из старейших городов планеты, расположенный в устье реки Тежу, в 15 км от Атлантического океана. Главная отличительная черта Лиссабона – потрясающая гармоничность облика, которую нечасто встретишь в местах с таким выдающимся и без преувеличения славным прошлым. Оранжевые крыши жилых домов, берберийские орнаменты на стенах и современные здания бизнес-центров здесь не только не контрастируют с объектами готической, барочной и мануэлинской архитектуры, но и вносят приятное разнообразие в общую картину.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  },
  {
    id: 4,
    name: 'Рейкьявик',
    description: 'Cтолица и одна из общин Исландии, называемая также «туристическими воротами» страны. Несмотря на то, что город является самым крупным на острове, его можно обойти пешком меньше чем за день. Компактные размеры – всего 274,5 км² – не мешают Рейкьявику быть важным научным и экономическим центром. Только здесь вам представится возможность выучить один из древнейших языков мира, посетить ледяное кафе и отведать мороженое с рыбой.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  },
  {
    id: 5,
    name: 'Хельсинки',
    description: 'Cтолица Финляндии, политический, научный и культурный центр страны. Этот неповторимый, разнообразный, интригующий город способен удивить даже тех, кто хорошо его знает. Причин приехать в Хельсинки может быть огромное количество: насладиться тишиной и свежим воздухом в эпицентре городской жизни, полюбоваться архитектурой в стиле модерн, увидеть северное сияние, попариться в знаменитой финской сауне, – но результат непременно один – здешняя атмосфера навсегда поселяется в сердце.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  },
  {
    id: 6,
    name: 'Тенерифе',
    description: 'Cамый большой из Канарских островов, его площадь составляет 2045 км², а население — 700 тыс. человек. Туристов здесь ждут многочисленные достопримечательности, развлечения, интересные города. Остров делится на южное побережье с сухим климатом и золотистыми пляжами и более влажное и ветреное северное побережье, чьи черные пески под крутыми скалами напоминают о вулканическом происхождении Тенерифе. Между ними на высоту 3718 м вознесся самый высокий пик Испании — гора Тейде.',
    photos: Array.from({length: getRandomPositiveInteger(2, 5)}, () => `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`)
  }
];

class MockPoint {
  constructor() {
    const date1 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;
    const date2 = `2023-${getRandomPositiveInteger(1,12)}-${getRandomPositiveInteger(1,30)}T${getRandomPositiveInteger(1,24)}:${getRandomPositiveInteger(1,59)}`;

    this.id = crypto.randomUUID();
    this.type = getRandomArrayElement(types);
    this.destination = getRandomArrayElement(destinations);
    this.dateFrom = getMinDate(date1, date2);
    this.dateTo = getMaxDate(date1, date2);
    this.basePrice = getRandomPositiveInteger(Price.MIN, Price.MAX);
    this.isFavorite = Boolean(getRandomPositiveInteger(0, 1));
    this.offers = mockOffers.get(this.type);
  }
}

const mockPoints = Array.from({length: getRandomPositiveInteger(1, 10)}, () => new MockPoint);

export {mockPoints};
