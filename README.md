# Press Me!

A button you can't help but press. This is a pure JavaScript component.

![react-native-press-me-button demo](https://github.com/jsoendermann/react-native-press-me-button/raw/master/imgs/ios.gif)
![react-native-press-me-button demo](https://github.com/jsoendermann/react-native-press-me-button/raw/master/imgs/android.gif)

## Usage

Install with `yarn add react-native-press-me-button`

```javascript
import PressMeButton from 'react-native-press-me-button'

<PressMeButton
  height={50}
  width={240}
  title="Press me!"
  titleStyle={{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }}
  // This is the background color behind the button. Make sure to set this prop!
  backgroundColor="#F0F0F0"
  onPress={() => console.log('Pressed!')}
  buttonColor="blue"
  edgeHeight={10}
  cornerRadius={5}
  shadowStyle={{
    shadowColor: '#0000AA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  }}
/>
```

## License

```
Copyright 2017 Jan Soendermann

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
