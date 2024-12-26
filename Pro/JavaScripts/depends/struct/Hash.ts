/**
 * key (hashing,key,collision,loading factor)
 * key-func (find,insert,delete)
 * 
 * 散列函数2个重要因素
 * 1.计算简单
 * 2.地址空间均匀分布
 * 
 * 数字关键词
 * h(key) = a * key + b;直接定址法
 * h(key) = key mod p ;除余法
 * h(key) = key[n] * (10 ** n);把随机变化大的位取出来
 * h(key);折叠法
 * h(key);平方取中法
 * 
 * 字符关键词
 * h(key) = (ASCLL码相加) mod TableSize;// 直接累加ASCLL
 * h(key) = (key[0] * (27 ** 2) + key[1] * (27 ** 1) + key[0]) mod TableSize;// 前移3位（26个字符 + 空格1 = 27）
 * 
 */