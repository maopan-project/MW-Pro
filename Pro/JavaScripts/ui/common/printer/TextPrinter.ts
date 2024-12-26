type Tag = { text: string, origin: string, lower: number, upper: number };

export default class TextPrinter {
    private _tagArr: Tag[] = [];
    private _printText: Map<number, string> = new Map();
    public get length() { return this._printText.size; }

    constructor(text: string) {
        this.clampTextTag(text);
        this.matchPrintText(text);
    }

    print(end: number) {
        let text = '';
        let head = '';
        let rear = '';
        let tempText = '';
        let lastKey = -1;
        let refresh = (k: number) => {
            let tagGroup = this.getTagGroupIndex(k, this._tagArr);
            for (let j = 0; j < tagGroup.length; j++) {
                let tag = this._tagArr[tagGroup[j]];
                head += '<' + tag.origin + '>';
                rear = '</' + tag.text + '>' + rear;
            }
        }

        for (const [k, v] of this._printText) {
            if (lastKey === -1) {
                refresh(k);
            } else {
                if (k - lastKey !== 1) {
                    if (head !== '') {
                        text += (head + tempText + rear);
                        head = rear = tempText = '';
                    }

                    if (tempText !== '') {
                        text += tempText;
                        tempText = '';
                    }

                    refresh(k);
                }
            }

            lastKey = k;
            tempText += v;
            if (--end <= 0) {
                text += (head + tempText + rear);
                break;
            }
        }
        return text;
    }
    
    private clampTextTag(text: string) {
        for (let i = 0; i < text.length;) {
            if (text[i] === '<') {
                let end = text.indexOf('>', i);
                if (end === -1) {
                    console.warn('标签不完整');
                    break;
                }

                if (text[i + 1] !== '/') {
                    let s = text.slice(i + 1, end);
                    let tag = this.matchTag(s);
                    if (tag === '') {
                        console.warn('标签不匹配');
                        break;
                    }

                    let findIndex = text.indexOf('</' + tag + '>', end);
                    if (findIndex !== -1) {
                        this._tagArr.push({ text: tag, origin: s, lower: i, upper: findIndex });
                    }
                }

                i += (end - i);
            }

            i++;
        }
    }

    private matchPrintText(text: string) {
        for (let i = 0; i < text.length;) {
            if (text[i] === '<') {
                for (let j = i; j < text.length; j++) {
                    if (text[j] === '>') {
                        i = j + 1;
                        break;
                    }
                }

                continue;
            }

            this._printText.set(i, text[i]);
            i++;
        }
    }

    private getTagGroupIndex(index: number, tagGroup: Tag[]) {
        return tagGroup.reduce<number[]>((prev, curr, currentValue) => {
            if (index > curr.lower && index < curr.upper)
                prev.push(currentValue);
            return prev;
        }, []);
    }

    private matchTag(str: string) {
        let matchStr = ['b', 'i', 'size', 'color', 'u', 's'];
        for (let i = 0; i < matchStr.length; i++) {
            if (str.slice(0, matchStr[i].length) === matchStr[i])
                return matchStr[i];
        }

        return '';
    }
}


