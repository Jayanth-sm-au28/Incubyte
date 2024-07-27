import React, { useState } from 'react';

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const add = (numbers: string): number => {
    if (numbers == '') return 0;
    const numArray = numbers.split(',').map(Number);
    return numArray.reduce((sum, num) => sum + num, 0);
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
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
