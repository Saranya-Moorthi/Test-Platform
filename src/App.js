import React, { useState, useEffect } from 'react';
import { Play, Square, Code, Clock, CheckCircle, Trophy, Timer, Users, BookOpen, Settings, Home, RotateCcw, Save, Upload } from 'lucide-react';
import './App.css'; 

const questionsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    timeLimit: "30 min",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" }
    ],
    hints: ["Use a hash map to store complement values", "One pass solution is possible"],
    companies: ["Google", "Amazon", "Microsoft"]
  },
  {
    id: 2,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    category: "Tree",
    timeLimit: "20 min",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder traversal: left -> root -> right"
      }
    ],
    testCases: [
      { input: "[1,null,2,3]", expectedOutput: "[1,3,2]" },
      { input: "[]", expectedOutput: "[]" },
      { input: "[1]", expectedOutput: "[1]" }
    ],
    hints: ["Consider both recursive and iterative solutions", "Use stack for iterative approach"],
    companies: ["Facebook", "Apple", "Netflix"]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    timeLimit: "45 min",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
      { input: '"pwwkew"', expectedOutput: "3" }
    ],
    hints: ["Use sliding window technique", "HashMap to track character positions"],
    companies: ["Amazon", "Microsoft", "Adobe"]
  },
  {
    id: 4,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    timeLimit: "25 min",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a sorted fashion and return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "The lists are merged in sorted order."
      }
    ],
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[], []", expectedOutput: "[]" },
      { input: "[], [0]", expectedOutput: "[0]" }
    ],
    hints: ["Use two pointers", "Consider edge cases with empty lists"],
    companies: ["Google", "LinkedIn", "Uber"]
  },
  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    timeLimit: "20 min",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The parentheses are properly matched."
      }
    ],
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" }
    ],
    hints: ["Use a stack data structure", "Map closing brackets to opening ones"],
    companies: ["Microsoft", "Amazon", "Apple"]
  },
  {
    id: 6,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    timeLimit: "15 min",
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "The maximum depth is 3."
      }
    ],
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3" },
      { input: "[1,null,2]", expectedOutput: "2" },
      { input: "[]", expectedOutput: "0" }
    ],
    hints: ["Use recursion or BFS", "Base case: null node has depth 0"],
    companies: ["Facebook", "Google", "Twitter"]
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    timeLimit: "20 min",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      }
    ],
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "4", expectedOutput: "5" }
    ],
    hints: ["This is a Fibonacci sequence", "Use dynamic programming for optimization"],
    companies: ["Apple", "Adobe", "Cisco"]
  },
  {
    id: 8,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    timeLimit: "25 min",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" },
      { input: "[1,2,3,4,5]", expectedOutput: "4" }
    ],
    hints: ["Keep track of minimum price so far", "Calculate max profit at each step"],
    companies: ["Goldman Sachs", "JP Morgan", "Bloomberg"]
  }
];

const languageTemplates = {
  python: `# Python Solution
def solution():
    """
    Write your solution here
    Time Complexity: O(?)
    Space Complexity: O(?)
    """
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(f"Result: {result}")`,
  
  java: `import java.util.*;

public class Solution {
    /**
     * Write your solution here
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    public int solve() {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int result = sol.solve();
        System.out.println("Result: " + result);
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Write your C solution here
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
int main() {
    // Your code here
    
    printf("Hello World\\n");
    return 0;
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    /**
     * Write your C++ solution here
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    int solve() {
        // Your code here
        return 0;
    }
};

int main() {
    Solution sol;
    int result = sol.solve();
    cout << "Result: " << result << endl;
    return 0;
}`
};

const CodingTestWebsite = () => {
  const [currentView, setCurrentView] = useState('questions');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [buttonStates, setButtonStates] = useState({});

  const questions = questionsData;

  const handleButtonClick = (buttonId, callback) => {
    setButtonStates(prev => ({ ...prev, [buttonId]: 'clicked' }));
    
    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [buttonId]: 'normal' }));
      if (callback) callback();
    }, 150);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuestionClick = (question) => {
    handleButtonClick(`question-${question.id}`, () => {
      setSelectedQuestion(question);
      setCurrentView('compiler');
      setCode(languageTemplates[selectedLanguage]);
      setOutput('');
      setTestResults([]);
      setTimer(0);
      setIsTimerRunning(true);
    });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(languageTemplates[language]);
  };

  const validateCode = () => {
    const currentTemplate = languageTemplates[selectedLanguage];
    const codeWithoutWhitespace = code.replace(/\s/g, '').toLowerCase();
    const templateWithoutWhitespace = currentTemplate.replace(/\s/g, '').toLowerCase();
    
    if (codeWithoutWhitespace === templateWithoutWhitespace) {
      return {
        isValid: false,
        reason: "No implementation found"
      };
    }
    
    const hasFunction = code.includes('def ') || code.includes('function') || code.includes('public') || code.includes('int main');
    const hasLogic = code.includes('for') || code.includes('while') || code.includes('if') || code.includes('return');
    const hasComments = code.includes('//') || code.includes('#') || code.includes('/*');
    const codeLength = code.replace(/\s/g, '').length;
    
    if (codeLength < 50) {
      return {
        isValid: false,
        reason: "Code too short - needs proper implementation"
      };
    }
    
    if (!hasFunction) {
      return {
        isValid: false,
        reason: "No function definition found"
      };
    }
    
    if (!hasLogic) {
      return {
        isValid: false,
        reason: "No implementation logic found"
      };
    }
    
    return {
      isValid: true,
      reason: "Code looks good"
    };
  };

  const handleRunCode = () => {
    handleButtonClick('run', () => {
      setIsRunning(true);
      setOutput('🚀 Compiling and running your code...\n\n');
      
      setTimeout(() => {
        const validation = validateCode();
        
        if (!validation.isValid) {
          let outputText = `❌ Compilation Error!\n\n`;
          outputText += `🚫 Error: ${validation.reason}\n\n`;
          outputText += `📝 Please implement your solution:\n`;
          outputText += `• Add proper function implementation\n`;
          outputText += `• Write the algorithm logic\n`;
          outputText += `• Test your solution before running\n\n`;
          outputText += `💡 Tip: Replace the template code with your actual solution!`;
          
          setOutput(outputText);
          setIsRunning(false);
          setTestResults([]);
          return;
        }
        
        const results = selectedQuestion.testCases.map((testCase, index) => {
          const codeQuality = Math.min(1.0, code.replace(/\s/g, '').length / 200);
          const hasGoodPractices = code.includes('return') && (code.includes('for') || code.includes('while'));
          const basePassRate = hasGoodPractices ? 0.8 : 0.4;
          const finalPassRate = basePassRate * codeQuality;
          
          const passed = Math.random() < finalPassRate;
          
          return {
            testCase: index + 1,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: passed ? testCase.expectedOutput : "Wrong Answer",
            passed: passed,
            runtime: `${Math.floor(Math.random() * 50) + 10}ms`,
            memory: `${(Math.random() * 5 + 10).toFixed(1)}MB`
          };
        });
        
        setTestResults(results);
        
        const passedCount = results.filter(r => r.passed).length;
        const totalCount = results.length;
        
        let outputText = `✅ Compilation Successful!\n\n`;
        outputText += `📊 Test Results: ${passedCount}/${totalCount} passed\n\n`;
        
        results.forEach((result, index) => {
          const status = result.passed ? '✅ PASSED' : '❌ FAILED';
          outputText += `Test Case ${result.testCase}: ${status}\n`;
          outputText += `Input: ${result.input}\n`;
          outputText += `Expected: ${result.expected}\n`;
          outputText += `Actual: ${result.actual}\n`;
          outputText += `Runtime: ${result.runtime} | Memory: ${result.memory}\n\n`;
        });
        
        if (passedCount === totalCount) {
          outputText += `🎉 Congratulations! All test cases passed!\n`;
          outputText += `⚡ Average Runtime: ${Math.floor(Math.random() * 30) + 20}ms\n`;
          outputText += `💾 Memory Usage: ${(Math.random() * 3 + 12).toFixed(1)}MB\n`;
          outputText += `🌟 Great job on implementing the solution!\n`;
        } else {
          outputText += `🤔 Some test cases failed. Consider:\n`;
          outputText += `• Check edge cases\n`;
          outputText += `• Verify your algorithm logic\n`;
          outputText += `• Review the problem statement\n`;
          outputText += `• Debug step by step\n`;
        }
        
        setOutput(outputText);
        setIsRunning(false);
      }, 2500);
    });
  };

  const handleStopCode = () => {
    handleButtonClick('stop', () => {
      setIsRunning(false);
      setOutput(prev => prev + '\n⏹️ --- Execution stopped by user ---');
    });
  };

  const handleResetCode = () => {
    handleButtonClick('reset', () => {
      setCode(languageTemplates[selectedLanguage]);
      setOutput('');
      setTestResults([]);
    });
  };

  const handleBackToQuestions = () => {
    handleButtonClick('back', () => {
      setCurrentView('questions');
      setIsTimerRunning(false);
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-700 bg-green-100 border-green-200';
      case 'Medium': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'Hard': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Array': 'bg-blue-100 text-blue-800',
      'String': 'bg-purple-100 text-purple-800',
      'Tree': 'bg-green-100 text-green-800',
      'Linked List': 'bg-yellow-100 text-yellow-800',
      'Stack': 'bg-red-100 text-red-800',
      'Dynamic Programming': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getButtonClass = (buttonId, baseClass) => {
    const state = buttonStates[buttonId] || 'normal';
    const animationClass = state === 'clicked' 
      ? 'transform scale-95 transition-transform duration-150 ease-in-out' 
      : 'transform scale-100 transition-all duration-200 ease-in-out hover:scale-105';
    return `${baseClass} ${animationClass}`;
  };

  if (currentView === 'questions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                  <Code className="text-white w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    CodeMaster Pro
                  </h1>
                  <p className="text-gray-600">Master coding interviews with confidence</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">1.2M+ developers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Premium Problems</span>
                </div>
              </div>
            </div>
          </div>
        </header>

       
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: CheckCircle, color: 'green', label: 'Total Problems', value: questions.length },
              { icon: BookOpen, color: 'blue', label: 'Languages', value: '4' },
              { icon: Trophy, color: 'purple', label: 'Success Rate', value: '95%' },
              { icon: Timer, color: 'orange', label: 'Available', value: '24/7' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Programming Challenges</h2>
              <p className="text-gray-600">Select a problem to start your coding journey</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={getButtonClass(`question-${question.id}`, 
                    "p-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 cursor-pointer group border-l-4 border-transparent hover:border-indigo-500"
                  )}
                  onClick={() => handleQuestionClick(question)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 group-hover:bg-indigo-100 rounded-lg px-3 py-2 transition-colors duration-200">
                        <span className="text-lg font-bold text-gray-600 group-hover:text-indigo-600">#{question.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                        {question.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{question.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                        <Timer className="w-4 h-4" />
                        <span className="font-medium">{question.timeLimit}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">{question.testCases.length} test cases</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {question.companies.slice(0, 3).map((company, index) => (
                        <span key={index} className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                          {company}
                        </span>
                      ))}
                      {question.companies.length > 3 && (
                        <span className="text-xs text-gray-500">+{question.companies.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToQuestions}
                className={getButtonClass('back', 
                  "flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50"
                )}
              >
                <Home className="w-4 h-4" />
                Problems
              </button>
              <div className="text-gray-300">|</div>
              <h1 className="text-xl font-bold text-gray-800">
                {selectedQuestion?.title}
              </h1>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(selectedQuestion?.difficulty)}`}>
                {selectedQuestion?.difficulty}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-2 rounded-lg">
                <Timer className="w-4 h-4 text-gray-500" />
                <span className="font-mono font-bold text-gray-700">
                  {formatTime(timer)}
                </span>
              </div>
              
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <option value="python">🐍 Python</option>
                <option value="java">☕ Java</option>
                <option value="c">⚡ C</option>
                <option value="cpp">🔥 C++</option>
              </select>
              
              <button
                onClick={handleResetCode}
                className={getButtonClass('reset', 
                  "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        <div className="w-1/2 bg-white border-r border-gray-300 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${getDifficultyColor(selectedQuestion?.difficulty)}`}>
                {selectedQuestion?.difficulty}
              </span>
              <span className={`px-3 py-2 rounded-lg text-sm font-medium ${getCategoryColor(selectedQuestion?.category)}`}>
                {selectedQuestion?.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                <Timer className="w-4 h-4" />
                {selectedQuestion?.timeLimit}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedQuestion?.title}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">{selectedQuestion?.description}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Example
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <span className="font-bold text-gray-700 text-sm uppercase tracking-wide">Input:</span>
                    <code className="block mt-2 bg-white px-4 py-3 rounded-lg font-mono text-sm border border-gray-200 text-blue-800">
                      {selectedQuestion?.examples[0].input}
                    </code>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 text-sm uppercase tracking-wide">Output:</span>
                    <code className="block mt-2 bg-white px-4 py-3 rounded-lg font-mono text-sm border border-gray-200 text-green-800">
                      {selectedQuestion?.examples[0].output}
                    </code>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 text-sm uppercase tracking-wide">Explanation:</span>
                    <p className="mt-2 text-gray-600 italic">{selectedQuestion?.examples[0].explanation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Test Cases
              </h3>
              <div className="space-y-4">
                {selectedQuestion?.testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="text-sm space-y-3">
                      <div>
                        <span className="font-semibold text-gray-700">Test Case {index + 1}:</span>
                        <code className="block mt-1 bg-white px-3 py-2 rounded-lg font-mono text-xs border border-gray-200">
                          Input: {testCase.input}
                        </code>
                      </div>
                      <div>
                        <code className="block bg-white px-3 py-2 rounded-lg font-mono text-xs border border-gray-200">
                          Expected: {testCase.expectedOutput}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Hints</h3>
              <div className="space-y-3">
                {selectedQuestion?.hints.map((hint, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <p className="text-sm text-yellow-800 font-medium">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

          
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🏢 Asked by</h3>
              <div className="flex flex-wrap gap-3">
                {selectedQuestion?.companies.map((company, index) => (
                  <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 hover:shadow-md transition-all duration-200">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 bg-gray-900">
            <div className="h-full flex flex-col">
              <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    {selectedLanguage.toUpperCase()} Editor
                  </span>
                  <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    Font: {fontSize}px
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                      className="text-gray-400 hover:text-gray-300 px-2 py-1 text-xs hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize(Math.min(20, fontSize + 1))}
                      className="text-gray-400 hover:text-gray-300 px-2 py-1 text-xs hover:bg-gray-700 rounded transition-colors duration-200"
                    >
                      A+
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className={getButtonClass('run',
                        `bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-500 disabled:to-green-600 text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg disabled:shadow-none ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`
                      )}
                    >
                      {isRunning ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span className="animate-pulse">Running...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Run Code
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleStopCode}
                      disabled={!isRunning}
                      className={getButtonClass('stop',
                        `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg disabled:shadow-none ${isRunning ? 'cursor-pointer' : 'cursor-not-allowed'}`
                      )}
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </button>
                  </div>
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-gray-900 text-green-400 p-6 font-mono resize-none focus:outline-none selection:bg-green-700 selection:text-white"
                style={{ 
                  fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.6'
                }}
                placeholder={`// Start coding in ${selectedLanguage.toUpperCase()}...\n// Pro tip: Use proper variable names and add comments!`}
                spellCheck={false}
              />
            </div>
          </div>

        
          <div className="h-64 bg-black border-t border-gray-600">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-medium flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  Console Output
                </div>
                {testResults.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                      {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
                    </span>
                    {testResults.filter(r => r.passed).length === testResults.length ? (
                      <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full animate-pulse">
                        All Passed! 🎉
                      </span>
                    ) : (
                      <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full">
                        Some Failed ❌
                      </span>
                    )}
                  </div>
                )}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOutput('')}
                  className="text-gray-400 hover:text-gray-300 text-xs px-3 py-2 hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Clear Console
                </button>
              </div>
            </div>
            <div className="h-52 p-6 overflow-y-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                {output || `💻 Welcome to CodeMaster Pro IDE!
                
🚀 Click "Run Code" to execute your solution
📝 Write clean, optimized code
🧪 Test with provided examples
💡 Use hints if you get stuck
⏱️  Timer is running - manage your time wisely

Good luck coding! 🌟`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingTestWebsite;