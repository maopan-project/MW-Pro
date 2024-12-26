class Node<T> {
    // 引用则是非侵入式，值则是侵入式
    data: T;
    next: Node<T>;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

// 单向链表（非侵入式）
export class LinkList<T> {
    head: Node<T> = null;
    tail: Node<T> = null;

    insertAtHead(data: T) {
        let node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;// 如果链表为空，head 和 tail 都是新节点
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    insertAtTail(data: T) {
        let node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;// 如果链表为空，head 和 tail 都是新节点
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    insertAtPosition(data: T, position: number) {
        if (position === 0) {
            this.insertAtHead(data);
            return;
        }

        const newNode = new Node(data);
        let temp = this.head;
        let currentPosition = 0;

        // 寻找插入位置
        while (temp && currentPosition < position - 1) {
            temp = temp.next;
            currentPosition++;
        }

        if (temp) {
            newNode.next = temp.next;
            temp.next = newNode;
            // 如果插入的是最后一个节点，需要更新尾指针
            if (!newNode.next) {
                this.tail = newNode;
            }
        }
    }

    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
            // 如果链表为空，需要清空尾指针
            if (!this.head) {
                this.tail = null;
            }
        }
    }

    deleteTail() {
        if (!this.head) return;

        if (!this.head.next) {
            // 链表只有一个节点
            this.head = this.tail = null;
        } else {
            let temp = this.head;
            while (temp.next !== this.tail) {
                temp = temp.next;
            }
            temp.next = null;
            this.tail = temp;  // 更新尾指针
        }
    }

    deleteAtPosition(position: number) {
        if (position === 0) {
            this.deleteHead();
            return;
        }

        let temp = this.head;
        let currentPosition = 0;

        // 寻找指定位置
        while (temp && currentPosition < position - 1) {
            temp = temp.next;
            currentPosition++;
        }

        if (temp && temp.next) {
            temp.next = temp.next.next;
            // 如果删除的是尾节点，需要更新尾指针
            if (!temp.next) {
                this.tail = temp;
            }
        }
    }

    // 打印链表
    printList(): void {
        let temp = this.head;
        let values: T[] = [];
        while (temp) {
            values.push(temp.data);
            temp = temp.next;
        }

        console.log(values.join(' -> '));
    }
}