class HashSet {
    constructor() {
        this.bucketSize = 16;
        this.usedBuckets = 0;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        
        return hashCode % this.bucketSize;
    } 

    checkLoadFactor() {
        if ((this.usedBuckets / this.bucketSize) > this.loadFactor) {
            const oldBuckets = this.buckets;
            this.bucketSize *= 2;
            this.buckets = new Array(this.bucketSize).fill(null).map(() => []);

            // Transfer existing elements to new buckets
            for (const bucket of oldBuckets) {
                for (const [key] of bucket) {
                    const newIndex = this.hash(key);
                    this.buckets[newIndex].push([key]);
                }
            };
        };
    };

    set(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    // The same key, do nothing
                    return;
                };
            };
        };
         
        // Push new key-value pairs
        bucket.push([key]);
        this.usedBuckets ++;

        this.checkLoadFactor();
    };

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    return bucket[j][0];
                };
            };
        };

        return null;
    };

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    return true;
                };
            };
        };

        return false;
    };

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    bucket.splice(j, 1);
                    this.usedBuckets --;
                    return true;
                };
            };
        };

        return false;
    };

    length() {
        return this.buckets.reduce((total, bucket) => total + bucket.length, 0);
    };

    clear() {
        this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
        this.usedBuckets = 0;
    };
 
    keys() {
        const keysArr = [];

        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keysArr.push(key);
            }
        };

        return keysArr;
    };
};

const hashSet = new HashSet();

console.log("-----");
console.log("-----");
console.log("-----");
console.log("Below is the HashSet, the same as HashMap but with keys only");
console.log("Set: " + hashSet.set("Maximilian"));
console.log("Get(yes): " + hashSet.get("Maximilian"));
console.log("Get(no): " + hashSet.get("Maximiliannn"));
console.log("Has(yes): " + hashSet.has("Maximilian"));
console.log("Has(no): " + hashSet.has("Maximiliannn"));
console.log("Remove(yes): " + hashSet.remove("Maximilian"));
console.log("Set: " + hashSet.set("Maximilian"));
console.log("Remove(no): " + hashSet.remove("Maximiliannn"));
console.log("Length(1) : " + hashSet.length());
console.log("Set: " + hashSet.set("Maximiliannn"));
console.log("Length(2) : " + hashSet.length());
console.log("Clear: " + hashSet.clear());
console.log("Length(0) : " + hashSet.length());
console.log("Set: " + hashSet.set("Maximilian"));
console.log("Set: " + hashSet.set("Maximiliannn"));
console.log("Keys: " + hashSet.keys());