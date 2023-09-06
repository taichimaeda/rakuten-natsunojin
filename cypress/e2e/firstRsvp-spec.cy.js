import { faker } from "@faker-js/faker";

const allowedLocationCodes = {
  "宮城県": ["040002", "041009", "042021", "042030", "042056", "042064", "042072", "042081", "042099", "042111", "042129", "042137", "042145", "042153", "042161", "043010", "043028", "043214", "043222", "043231", "043249", "043419", "043613", "043621", "044016", "044041", "044067", "044211", "044229", "044245", "044440", "044458", "045012", "045055", "045811", "046060"],
  "大阪府": ["270008", "271004", "271403", "272027", "272035", "272043", "272051", "272060", "272078", "272086", "272094", "272108", "272116", "272124", "272132", "272141", "272159", "272167", "272175", "272183", "272191", "272205", "272213", "272221", "272230", "272248", "272256", "272264", "272272", "272281", "272299", "272302", "272311", "272329", "273015", "273210", "273228", "273414", "273619", "273627", "273660", "273813", "273821", "273830"],
  "兵庫県": ["280003", "281000", "282014", "282022", "282031", "282049", "282057", "282065", "282073", "282081", "282090", "282103", "282120", "282138", "282146", "282154", "282162", "282171", "282189", "282197", "282201", "282219", "282227", "282235", "282243", "282251", "282260", "282278", "282286", "282294", "283011", "283657", "283819", "283827", "284424", "284432", "284467", "284645", "284815", "285013", "285854", "285862"],
};
const forbiddenLocationCodes = ["123456", "654321", "789012", "210987", "345678", "876543", "567890", "098765", "432109", "901234", "135792", "246813", "864209", "357924", "468135", "159273", "864201", "739182", "648203", "951357"];
const allowedZipCodePrefixes = {
  "宮城県": "98",
  "大阪府": "27",
  "兵庫県": "97",
};
const forbiddenZipCodePrefixes = ["11", "22", "33", "44", "55", "66", "77", "88", "99", "56"];
const allowedNames = ["浅野 之賀", "松下 砂南", "三木 章太", "服部 孝信", "小坂 拓也", "小林 光昭", "大槻 繭友", "竹下 琉利", "梶原 直杏", "高田 真吾"]
const allowedAddresses = [{ "prefecture": "宮城県", "street": "太宰府市大瀬東" }, { "prefecture": "宮城県", "street": "宮古市瑞穂町西郷丙" }, { "prefecture": "宮城県", "street": "水俣市中町" }, { "prefecture": "宮城県", "street": "南陽市上田町" }, { "prefecture": "宮城県", "street": "佐伯市阪田" }, { "prefecture": "大阪府", "street": "糟屋郡粕屋町日置野田" }, { "prefecture": "大阪府", "street": "大島郡天城町三和区川浦" }, { "prefecture": "兵庫県", "street": "一宮市上神輿町" }, { "prefecture": "兵庫県", "street": "武蔵村山市梨ケ原" }];
const forbiddenAddresses = [{ "prefecture": "香川県", "street": "さぬき市中新" }, { "prefecture": "沖縄県", "street": "大沼郡三島町宝町" }, { "prefecture": "北海道", "street": "吉野郡十津川村油町" }, { "prefecture": "山口県", "street": "高座郡寒川町宮浦" }, { "prefecture": "岐阜県", "street": "鎌倉市下川上" }, { "prefecture": "山梨県", "street": "鎌倉市東本宿" }, { "prefecture": "山口県", "street": "長岡郡大豊町加子母" }, { "prefecture": "佐賀県", "street": "中川郡豊頃町吉田町川手" }, { "prefecture": "富山県", "street": "肝属郡錦江町岩倉" }];

function inputFirstReservationInfo({
  locationCode = '040002',
  vaccinationId = '210000000000',
  zipCode = '1000000',
  prefecture = '宮城県',
  street = '仙台市青葉区国分町３丁目７−１',
  name = '山田太郎',
  telephone = '0222611111',
  birthYear = '2000',
  birthMonth = '1',
  birthDay = '1',
}) {
  if (locationCode !== '')
    cy.get('input[placeholder="Location Code"]').type(locationCode);
  if (vaccinationId !== '')
    cy.get('input[placeholder="Vaccination ID"]').type(vaccinationId);
  if (zipCode !== '')
    cy.get('input[placeholder="Zip Code"]').type(zipCode);
  if (prefecture !== '') {
    cy.get('input[name="prefecture"]').type(prefecture);
    cy.get('li[data-option-index="0"]').click();
  }
  if (street !== '')
    cy.get('input[placeholder="Address"]').type(street);
  if (name !== '')
    cy.get('input[placeholder="Name"]').type(name);
  if (telephone !== '')
    cy.get('input[placeholder="Telephone"]').type(telephone);
  if (birthYear !== '') {
    cy.get('input[name="year"]').type(birthYear);
    cy.get('li[data-option-index="0"]').click();
  }
  if (birthMonth !== '') {
    cy.get('input[name="month"]').type(birthMonth);
    cy.get('li[data-option-index="0"]').click();
  }
  if (birthDay !== '') {
    cy.get('input[name="day"]').type(birthDay);
    cy.get('li[data-option-index="0"]').click();
  }
}

describe("First Reservation", () => {
  beforeEach(() => {
    cy.visit("/firstRsvp");
  });

  describe.skip('Succeeds with correct information', function () {
    for (let i = 1; i <= 5; i++) {
      it(`Succeeds with correct information #${i}`, function () {
        const address = faker.helpers.arrayElement(allowedAddresses);
        const prefecture = address.prefecture;
        const street = address.street;
        const locationCode = faker.helpers.arrayElement(allowedLocationCodes[prefecture]);
        const vaccinationId = faker.number.int({ min: 210000000000, max: 219999999999 });
        const zipCode = faker.location.zipCode(allowedZipCodePrefixes[prefecture] + '#####');
        const name = faker.helpers.arrayElement(allowedNames);
        const telephone = faker.phone.number('###########');
        const birthDate = faker.date.birthdate({ min: 1900, max: 2005, mode: 'year' });
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth() + 1;
        const birthDay = birthDate.getDate();

        inputFirstReservationInfo({ locationCode, vaccinationId, zipCode, prefecture, street, name, telephone, birthYear, birthMonth, birthDay });

        cy.get('button').contains('Next').click();
        cy.contains('Choose Place & Date');
      });
    }

    it.skip('FIX: Succeeds with location code in zenkaku digits', function () {
      inputFirstReservationInfo({ locationCode: '０４０００２' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with vaccination id in zenkaku digits', function () {
      inputFirstReservationInfo({ vaccinationId: '２１００００００００００' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with zip code in zenkaku digits', function () {
      inputFirstReservationInfo({ zipCode: '９８０００００' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with telephone number in zenkaku digits', function () {
      inputFirstReservationInfo({ telephone: '０２２２６１１１１１' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with birth year in zenkaku digits', function () {
      inputFirstReservationInfo({ birthYear: '２０００' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with birth month in zenkaku digits', function () {
      inputFirstReservationInfo({ birthMonth: '０１' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });

    it.skip('FIX: Succeeds with birth day in zenkaku digits', function () {
      inputFirstReservationInfo({ birthMonth: '０１' });

      cy.get('button').contains('Next').click();
      cy.contains('Choose Place & Date');
    });
  })

  describe('Fails with wrong information', function () {
    describe('Fails with wrong location code', function () {
      it('Fails with empty location code', function () {
        inputFirstReservationInfo({ locationCode: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Location code is invalid');
      });

      it.skip('FIX: Fails with location code outside Miyagi, Osaka and Hyogo', function () {
        const address = faker.helpers.arrayElement(allowedAddresses);
        const prefecture = address.prefecture;
        const street = address.street;
        const locationCode = faker.helpers.arrayElement(forbiddenLocationCodes);
        const zipCode = faker.location.zipCode(allowedZipCodePrefixes[prefecture] + '#####');

        inputFirstReservationInfo({ prefecture, street, locationCode, zipCode });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });
    });

    describe('Fails with wrong vaccination id', function () {
      it('Fails with empty vaccination id', function () {
        inputFirstReservationInfo({ vaccinationId: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Vaccination id is invalid');
      });

      it('Fails with 11 digit vaccination id', function () {
        const vaccinationId = faker.string.numeric(11);

        inputFirstReservationInfo({ vaccinationId });

        cy.get('button').contains('Next').click();
        cy.contains('Vaccination id is invalid');
      });
    });

    describe('Fails with wrong zip code', function () {
      it('Fails with empty zip code', function () {
        inputFirstReservationInfo({ zipCode: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });

      it.skip('FIX: Fails with zip code outside Miyagi, Osaka and Hyogo', function () {
        const address = faker.helpers.arrayElement(allowedAddresses);
        const prefecture = address.prefecture;
        const street = address.street;
        const locationCode = faker.helpers.arrayElement(allowedLocationCodes);
        const zipCode = faker.location.zipCode(faker.helpers.arrayElement(forbiddenZipCodePrefixes) + '#####');

        inputFirstReservationInfo({ prefecture, street, locationCode, zipCode });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });
    });

    describe('Fails with wrong address', function () {
      it('Fails with empty address', function () {
        inputFirstReservationInfo({ prefecture: '', street: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Your prefecture is not available');
      });

      it('Fails with prefecture outside Miyagi, Osaka and Hyogo', function () {
        const address = faker.helpers.arrayElement(forbiddenAddresses);
        const prefecture = address.prefecture;
        const street = address.street;

        inputFirstReservationInfo({ prefecture, street });

        cy.get('button').contains('Next').click();
        cy.contains('Your prefecture is not available');
      });
    });

    describe('Fails with wrong name', function () {
      it('Fails with empty name', function () {
        inputFirstReservationInfo({ name: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });

      it.skip('FIX: Fails with name containing special characters', function () {
        const name = faker.helpers.arrayElement(allowedNames);
        const index = faker.number.int({ min: 0, max: name.length - 1 });
        const wrongName = name.slice(0, index) + '!!??<>' + name.slice(index + 1);

        inputFirstReservationInfo({ name: wrongName });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });
    });

    describe('Fails with wrong telephone number', function () {
      it('Fails with empty telephone number', function () {
        inputFirstReservationInfo({ telephone: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });

      it.skip('FIX: Fails with 9 digit telephone number', function () {
        const telephone = faker.phone.number('#########');

        inputFirstReservationInfo({ telephone });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });

      it('Fails with 12 digit telephone number', function () {
        const telephone = faker.phone.number('############');

        inputFirstReservationInfo({ telephone });

        cy.get('input[placeholder="Telephone"]').should('have.value', telephone.slice(0, 11));
      });

      it('Fails with telephone number containing characters', function () {
        const telephone = faker.string.alpha(11);

        inputFirstReservationInfo({ telephone });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });
    });

    describe('Fails with wrong birth date', function () {
      it('Fails with empty birth date', function () {
        inputFirstReservationInfo({ birthYear: '', birthMonth: '', birthDay: '' });

        cy.get('button').contains('Next').click();
        cy.contains('Please input valid data');
      });

      it('Fails with those aged 17', function () {
        const birthDate = new Date('2006-01-01');
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth() + 1;
        const birthDay = birthDate.getDate();

        inputFirstReservationInfo({ birthYear, birthMonth, birthDay });

        cy.get('button').contains('Next').click();
        cy.contains('Your age is not available');
      });
    });
  });
});

// 大阪府庁の住所：大阪府大阪市中央区大手前２丁目,電話番号:0669410351,zipcode:5408570 
// 兵庫県庁の住所：兵庫県神戸市中央区加納町６丁目５−１,電話番号: 0783318181,zipcode:6508570 



