class HashMap {
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
                for (const [key, value] of bucket) {
                    const newIndex = this.hash(key);
                    this.buckets[newIndex].push([key, value]);
                }
            };
        };
    };

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    // The same key, just update the value
                    bucket[j][1] = value;
                    return;
                };
            };
        };
         
        // Push new key-value pairs
        bucket.push([key, value]);
        this.usedBuckets ++;

        this.checkLoadFactor();
    };

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket.length > 0) {
            for (let j = 0; j < bucket.length; j++) {
                if (bucket[j][0] === key) {
                    return bucket[j][1];
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
            for (const [key, value] of bucket) {
                keysArr.push(key);
            }
        };

        return keysArr;
    };

    values() {
        const valuesArr = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                valuesArr.push(value);
            }
        };

        return valuesArr;
    };

    entries() {
        const keyValuePairsArr = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                keyValuePairsArr.push([key, value]);
            }
        };

        return keyValuePairsArr;
    };
};

const hashMap = new HashMap();

console.log("Set: " + hashMap.set("Maximilian", "New value"));
console.log("Get(yes): " + hashMap.get("Maximilian"));
console.log("Get(no): " + hashMap.get("Maximiliannn"));
console.log("Has(yes): " + hashMap.has("Maximilian"));
console.log("Has(no): " + hashMap.has("Maximiliannn"));
console.log("Remove(yes): " + hashMap.remove("Maximilian"));
console.log("Set: " + hashMap.set("Maximilian", "New value"));
console.log("Remove(no): " + hashMap.remove("Maximiliannn"));
console.log("Length(1) : " + hashMap.length());
console.log("Set: " + hashMap.set("Maximiliannn", "New value"));
console.log("Length(2) : " + hashMap.length());
console.log("Clear: " + hashMap.clear());
console.log("Length(0) : " + hashMap.length());
console.log("Set: " + hashMap.set("Maximilian", "New value"));
console.log("Set: " + hashMap.set("Maximiliannn", "New value"));
console.log("Keys: " + hashMap.keys());
console.log("Values: " + hashMap.values());
console.log("Entries: " + hashMap.entries());