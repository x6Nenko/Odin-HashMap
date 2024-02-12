class HashMap {
    constructor() {
        this.bucketSize = 16;
        this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        
        return hashCode;
    } 
};

const hashMap = new HashMap();