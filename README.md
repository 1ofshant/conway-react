# conway-react

Conway game for react.
 
## In this [Demo](http://conway.ofshant.com/) you may get familiar with how the component works.

### Installation

react version >= 16.8

```bash
npm install conway-react --save
```

### Import

```js
import Conway from 'conway-react';
```

### Usage

```js
<Conway />
```

### or 

```js
<Conway
  rowSize={30}
  colSize={30}
  sideWidth={600}
  timeSLot={50}
  className="myClassName"
>
```

### Attributes

| Attributes          | Type     | Default | Description |
| ----------          | ----     | ------- | ----------- |
| rowSize             | number   | 30      | Number of rows |
| colSize             | number   | 30      | Number of columns |
| sideWidth           | number   | 600     | Table height and width (in pixels) |
| timeSlot            | number   | 50      | Game update time interval |
| className           | string   | ''      | It's the class of all elements (BEM) |
