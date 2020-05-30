# DenCrawler

DenCrawler is a small site that allows anyone to get Sword and Shield raid event data off their running Nintendo Switch.

Example output:

```
Game: Sword
  1-Star Gigantamax Meowth
    Lv. 17
    Dynamax Level: 1
    Dynamax Boost: 1,4x
    Ability: All
    Moves:
      - Fake Out
      - Bite
      - Scratch
      - Feint
    Selection Probabilities:
      1-Star Desired: 15%

...etc.
```

See the latest events moments after they come out, even on your phone!

## Usage

1. Install [sys-http](https://github.com/zaksabeast/sys-http)
1. Go to http://dencrawler.pokemonrng.com/dist
   - Since sys-http does not currently have https support, you'll need to go to the http version of the site

## Contributing

1. Clone the repo
1. Run `yarn`
1. Run `yarn start`

## Credits

Thanks to the following:

- Kaphotics for pknx, where the flatbuffer was taken from
- Leanny, Admiral Fish, wwwwwwzx, Kaphotics, and Vladcik for all their contributions to raid RNG
- Leanny for the format this site uses to display raid data
