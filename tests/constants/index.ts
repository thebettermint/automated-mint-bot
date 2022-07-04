export const registryAddresses = [
  'rBGjaDmM79WSXpbAfH1xAg1rpWKf4rsZyV',
  'rpyE923zYEkmAPCsqGfr2mQSHwXm7k7nKo',
  'rB7ZA58j6QT5drkyDoU2MFg8ABFo1EskUR',
  'ratqtqh6x8RC5kagVTk6UTkDjYms7Z8qPD',
];

export const testServerURL = 'wss://s1.ripple.com/';
export const testAddress = 'ratqtqh6x8RC5kagVTk6UTkDjYms7Z8qPD';

export const testOrganization = {
  name: 'Remedy Alliance/For the People',
  description: 'Providing naloxone for harm reduction programs around the USA',
  address: 'rB7ZA58j6QT5drkyDoU2MFg8ABFo1EskUR',
  image:
    'https://github.com/thebettermint/registry/blob/main/src/assets/remedy.png?raw=true',
  url: '',
  phone: '',
  mailingAddress: '',
  country: '',
  EIN: '87-3486445',
  initiatives: [
    {
      title: 'Remedy #1',
      description: 'Test initiative',
      tag: 18,
      XAddress: '',
      start: 1655656869,
      end: 1655656869,
      defaultAsset:
        'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true',
    },
  ],
};

export const sampleRegistry: any = {
  document: {
    title: 'thebettermintRegistry',
    description: 'This is the registry for thebettermint ecosystem',
  },
  organizations: [
    {
      name: 'Save the Whales',
      description:
        'Our mission is to provide a more sustainable future for the whales',
      address: 'rBGjaDmM79WSXpbAfH1xAg1rpWKf4rsZyV',
      image:
        'https://github.com/thebettermint/registry/blob/main/src/assets/save_the_whales.png?raw=true',
      url: '',
      phone: '',
      mailingAddress: '',
      country: '',
      EIN: '95-3263536',
      initiatives: [
        {
          title: 'Save the Whales - Test',
          description:
            'This is the first test initiative, or funding round for the save the whales organization',
          tag: 5,
          XAddress: '',
          start: 1655656869,
          end: 1655656869,
          defaultAsset:
            'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true',
          tiers: [
            {
              title: 'Bronze Whale',
              description: 'Bronze Whale',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 20,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/whale/BronzeWhale.png?raw=true',
            },
            {
              title: 'Silver Whale',
              description: 'Silver Whale',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 100,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/whale/SilverWhale.png?raw=true',
            },
            {
              title: 'Gold Whale',
              description: 'Gold Whale',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 500,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/whale/GoldWhale.png?raw=true',
            },
          ],
        },
      ],
    },
    {
      name: 'Iowa Harm Reduction Coalition',
      description: 'Working to improve health equity in Iowa',
      address: 'rpyE923zYEkmAPCsqGfr2mQSHwXm7k7nKo',
      image:
        'https://github.com/thebettermint/registry/blob/main/src/assets/crest.png?raw=true',
      url: '',
      phone: '',
      mailingAddress: '',
      country: '',
      EIN: '82-1864287',
      initiatives: [
        {
          title: 'Coalition #1',
          description: 'Test initiative',
          tag: 8,
          XAddress: '',
          start: 1655656869,
          end: 1655656869,
          defaultAsset:
            'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true',
        },
      ],
    },
    {
      name: 'Remedy Alliance/For the People',
      description:
        'Providing naloxone for harm reduction programs around the USA',
      address: 'rB7ZA58j6QT5drkyDoU2MFg8ABFo1EskUR',
      image:
        'https://github.com/thebettermint/registry/blob/main/src/assets/remedy.png?raw=true',
      url: '',
      phone: '',
      mailingAddress: '',
      country: '',
      EIN: '87-3486445',
      initiatives: [
        {
          title: 'Remedy #1',
          description: 'Test initiative',
          tag: 18,
          XAddress: '',
          start: 1655656869,
          end: 1655656869,
          defaultAsset:
            'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true',
        },
      ],
    },
    {
      name: 'Feed Hungry Evan',
      description: 'This is an example organization to help feed my man Evan',
      address: 'ratqtqh6x8RC5kagVTk6UTkDjYms7Z8qPD',
      image: '',
      url: 'https://example.com',
      phone: '555-555-5555',
      mailingAddress: '1234 Example Drive, Seattle WA 12345',
      country: 'USA',
      EIN: '12-12343567',
      initiatives: [
        {
          title: 'Food Drive #1',
          description: 'Our inagural food drive',
          tag: 36,
          XAddress: '',
          start: 1655656869,
          end: 1655656869,
          defaultAsset:
            'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true',
          tiers: [
            {
              title: 'Bronze Taco',
              Description: 'Bronze Taco',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 5,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/taco/BronzeTaco.png?raw=true',
            },
            {
              title: 'Silver Taco',
              Description: 'Silver Taco',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 10,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/taco/SilverTaco.png?raw=true',
            },
            {
              title: 'Gold Taco',
              Description: 'Gold Taco',
              amount: {
                currency: 'XRP',
                issuer: '',
                value: 20,
              },
              asset:
                'https://github.com/thebettermint/registry/blob/main/src/assets/taco/GoldTaco.png?raw=true',
            },
          ],
        },
      ],
    },
  ],
};
