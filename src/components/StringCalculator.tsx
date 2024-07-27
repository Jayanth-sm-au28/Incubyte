import React, { useState } from 'react';

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number|null>(null);

  const add = (numbers: string): number => {
    if (numbers === '') return 0;
  
    let delimiter = /[\n,]+/;
    let inputNumbers = numbers;
  
    if (numbers.startsWith('//')) {
      const delimiterLineEnd = numbers.indexOf('\n');
      if (delimiterLineEnd !== -1) {
        const delimiterLine = numbers.substring(2, delimiterLineEnd).trim();
        const cleanDelimiter = delimiterLine.replace(/[\[\]]/g, '');
        delimiter = new RegExp(`[${cleanDelimiter}]`, 'g');
        inputNumbers = numbers.substring(delimiterLineEnd + 1);
      }
    }
    const normalizedNumbers = inputNumbers.replace(/\r\n|\r/g, '\n');
    const numArray = normalizedNumbers.split(delimiter).map((num) => {
      const parsedNum = parseInt(num.trim(), 10);
      return isNaN(parsedNum) ? 0 : parsedNum; 
    });
    const sum = numArray.reduce((total, num) => total + num, 0);  
    return sum;
  };
  
  
  
  const handleAdd = () => {
    try {
      const sum = add(input);
      setResult(sum);
    } catch (error:any) {
      setResult(null);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">String Calculator</h1>
      <textarea
        value={input}
        onChange={(e) => { console.log('Input onChange:', e.target.value); setInput(e.target.value)}}
        className="border p-2 mb-4"
        placeholder="Enter numbers"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
      {result != null && (
        <div className="mt-4">
          <h2 className="text-xl">Result: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default StringCalculator;
