
const { useState, useEffect } = React;

function BudgetManager() {
 
    const [income, setIncome] = useState(10000000);
    const [tempIncome, setTempIncome] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([
        { id: 1, text: 'Mobile Phone', amount: 10000, date: '11/02/2026' },
        { id: 2, text: 'Grocery', amount: 170, date: '11/02/2026' }
    ]);

  
   const totalSpent = (expenses || []).reduce((acc, item) => acc + item.amount, 0);
    const remaining = income - totalSpent;


    const handleSetIncome = () => {
        if (tempIncome && !isNaN(tempIncome)) {
            setIncome(parseFloat(tempIncome));
            setTempIncome("");
        }
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!description || !amount) {
            alert("Please fill both fields!");
            return;
        }
        
        const newExpense = {
            id: Date.now(),
            text: description,
            amount: parseFloat(amount),
            date: new Date().toLocaleDateString('en-GB') 
        };

        setExpenses([newExpense, ...expenses]);
        setDescription("");
        setAmount("");
    };

    return (
        <div className="main-card">
            <div className="main-heading">BUDGET MANAGER</div>
            
            <div className="balance-display">
                <p className="section-title">Total Income</p>
                <h1>{$${income.toLocaleString()}}</h1>
            </div>

     
            <div style={{ padding: '0 25px' }}>
                <input 
                    type="number" 
                    placeholder="Update Monthly Income" 
                    value={tempIncome}
                    onChange={(e) => setTempIncome(e.target.value)}
                />
                <button 
                    onClick={handleSetIncome}
                    style={{
                        width: '90%', padding: '12px', borderRadius: '12px',
                        backgroundColor: '#f1f5f9', border: 'none', fontWeight: '600',
                        cursor: 'pointer', marginBottom: '20px'
                    }}
                >
                    Set Income
                </button>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #f1f5f9', margin: '10px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                <div>
                    <div className="section-title" style={{ margin: 0 }}>Remaining</div>
                    <div className="green-number">${remaining.toLocaleString()}</div>
                </div>
                <div>
                    <div className="section-title" style={{ margin: 0 }}>Spent</div>
                    <div className="red-number">${totalSpent.toLocaleString()}</div>
                </div>
            </div>

            <div className="section-title">Add New Expense</div>
            <form onSubmit={handleAddExpense}>
                <input 
                    type="text" 
                    placeholder="What did you buy?" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="How much?" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                    type="submit"
                    style={{
                        width: '90%', padding: '15px', borderRadius: '12px',
                        backgroundColor: '#1e293b', color: 'white', border: 'none',
                        fontWeight: '700', cursor: 'pointer', marginTop: '10px'
                    }}
                >
                    Deduct from Income
                </button>
            </form>

            <div className="section-title">Transaction History</div>
            <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
                {expenses.map(exp => (
                    <div key={exp.id} style={{ 
                        display: 'flex', justifyContent: 'space-between', 
                        alignItems: 'center', padding: '12px 0', 
                        borderBottom: '1px solid #f8fafc' 
                    }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{exp.text}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{exp.date}</div>
                        </div>
                        <div style={{ fontWeight: '700', color: '#ef4444' }}>
                            -${exp.amount.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<BudgetManager />);

