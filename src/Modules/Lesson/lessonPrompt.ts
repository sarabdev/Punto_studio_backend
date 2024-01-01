export const generateStructuredAnalysis = (text: string) => {
  return `

Key Points: Identify and explain the key points within the text, ensuring each is given thorough coverage.
Keyword Explanations: Select important keywords from the text and provide definitions or explanations to clarify their meaning and relevance.

Note:First of all go throught the text check what the text is about like if the text is resume the what your main purpuse list all the positions,skill,educations,skill detail in your own word,if the
text is about match content go throught the text check the main topic explain like formulas ,examples or other if the text if about some new extract the main topic of the new, then why happen ,when happen ,what precaution,new person name and do from the text lot more
so based on the text provide the output.Thanks

Examples and Solutions:
If the text includes examples, present these with a detailed, step-by-step walkthrough of the solution.
If examples are provided without solutions, create and detail the step-by-step process to solve these examples.

I want the result in markdown so please provide me a markdown and extract the import key topic from the text if it has and give a detail explanation of that sub topic via through text provided or if
text provided do not have then please add it.

As an example when the provide text is:    DIRECTION FIELDS
Let us imagine for the moment that we have in front of us a first-order DE
𝑑𝑦
𝑑𝑥 = 𝑓(𝑥, 𝑦) (1)
and let us further imagine that we can neither find nor invent a method for
solving it analytically. This is not as bad a predicament as one might think,
since the DE itself can sometimes “tell” us specifics about how its solutions
“behave” or we can say Solutions curves without a solution.
The function f in the normal form (1) is called the slope function or rate
function. The slope of the tangent line at (x, y(x)) on a solution curve is the
value of the first derivative dy/dx at this point, and we know from (1) that
this is the value of the slope function f (x, y(x)). The value f (x, y) that the
function f assigns to the point represents the slope of a line or line
segment. For example, consider the equation
𝑑𝑦
𝑑𝑥 = 0.2𝑥𝑦 = 𝑓(𝑥, 𝑦)
At the point (2, 3) the slope of a line is f (2, 3) = 1.2.
First figure shows a line segment with slope 1.2
passing though (2, 3). As shown in Figure, if a
solution curve also passes through the point (2, 3), it
does so tangent to this line segment; in other words,
the lineal element is a miniature tangent line at that
point.
If we systematically evaluate f over a rectangular
grid of points in the xy-plane and draw a line
element at each point (x, y) of the grid with slope f
(x, y), then the collection of all these line elements
is called a direction field or a slope field of the
DE (1). Visually, the direction field suggests the
appearance or shape of a family of solution
curves of the DE.
The direction field for the DE dy/dx =0.2xy shown
in Figure (a) was obtained by using computer
software.
A single solution curve that passes through a
direction field must follow the flow pattern of
the field; it is tangent to a line element when it
intersects a point in the grid. Figure (b) shows
a computer-generated direction field of the
differential equation dy/dx = sin(x + y) over a
region of the xy-plane.
2.2 SEPARABLE VARIABLES
We begin our study of how to solve differential equations with the simplest
of all differential equations: first-order equations with separable variables.
Because the method in this section and many techniques for solving
differential equations involve integration, you are urged to refresh your
memory on important formulas.
DEFINITION Separable Equation
A first-order differential equation of the form
𝑑𝑦
𝑑𝑥 = 𝑔(𝑥)ℎ(𝑦)
is said to be separable or to have separable variables.
For example, the equations
𝑑𝑦
𝑑𝑥 = 𝑦
2𝑥𝑒
3𝑥+4𝑦
and
𝑑𝑦
𝑑𝑥 = 𝑦 + sin 𝑥
are separable and nonseparable, respectively. In the first equation we can
factor
𝑑𝑦
𝑑𝑥 = (𝑥𝑒
3𝑥
)( 𝑦
2𝑒
4𝑦
)
but in the second equation there is no way of expressing 𝑦 + sin 𝑥 as a
product of a function of x times a function of y.
then the expected output sould look like this:  # DIRECTION FIELDS\n\n## Introduction\n- A direction field is a graphical representation of a first-order differential equation (DE) that helps us understand the behavior of its solutions.\n- If we cannot solve a DE analytically, direction fields can provide information about how the solutions behave.\n\n## Slope Function\n- In a first-order DE of the form 𝑑𝑦/𝑑𝑥 = 𝑓(𝑥,𝑦), the function 𝑓(𝑥,𝑦) is called the slope function or rate function.\n- The slope of the tangent line at a point (𝑥, 𝑦(𝑥)) on a solution curve is given by the value of the first derivative 𝑑𝑦/𝑑𝑥 at that point.\n- The slope function 𝑓(𝑥, 𝑦(𝑥)) represents the value 𝑓 assigns to a point, which represents the slope of a line or line segment.\n\n## Direction Field\n- A direction field is a graphical representation of a first-order DE that shows the slopes of tangent lines at different points in the 𝑥-𝑦 plane.\n- Each point in the direction field corresponds to a specific 𝑥 and 𝑦 value, and the slope of the tangent line at that point is represented by an arrow.\n- The direction field helps us visualize how the solutions of the DE behave by showing the direction in which the solutions curve at each point.\n\n## Example\n- Consider the DE 𝑑𝑦/𝑑𝑥 = 0.2𝑥𝑦 = 𝑓(𝑥,𝑦).\n- To create a direction field for this DE, we can choose different points in the 𝑥-𝑦 plane and calculate the slope at each point using the slope function 𝑓(𝑥,𝑦).\n- For example, at the point (𝑥, 𝑦), the slope of the tangent line is given by 𝑓(𝑥, 𝑦) = 0.2𝑥𝑦.\n- We can represent this slope using an arrow in the direction field, with the length of the arrow indicating the magnitude of the slope.\n- By creating arrows at different points in the 𝑥- # Slope of a Line and Direction Field\n\n## Slope of a Line\n- The slope of a line is a measure of how steep the line is.\n- It is denoted by the symbol f(x, y) and represents the rate of change of y with respect to x.\n- For example, if f(2, 3) = 1.2, it means that the line passing through the point (2, 3) has a slope of 1.2.\n- The slope can be visualized as the inclination of the line segment.\n\n## Direction Field\n- A direction field, also known as a slope field, is a collection of line elements that represent the slopes of a differential equation (DE) at different points in the xy-plane.\n- To create a direction field, we systematically evaluate the slope function f(x, y) over a rectangular grid of points and draw a line element at each point with the corresponding slope.\n- The direction field gives us a visual representation of the flow pattern and shape of the solution curves of the DE.\n- It helps us understand how the solution curves behave and how they are influenced by the slope at each point.\n\n## Tangent Lines and Solution Curves\n- If a solution curve passes through a point in the direction field, it follows the flow pattern of the field.\n- At the point of intersection, the solution curve is tangent to the line element with the corresponding slope.\n- In other words, the line element acts as a miniature tangent line at that point on the solution curve.\n- This tangent line represents the direction in which the solution curve is moving at that particular point.\n\n## Example\n- Let's consider the DE dy/dx = 0.2xy.\n- The direction field for this DE, as shown in Figure (a), was obtained using computer software.\n- Each line element in the direction field represents the slope of the DE at a specific point (x, y).\n- If we were to draw a solution curve that passes through the direction field, it would follow the flow pattern of the field and be tangent to the line elements at the points of intersection.\n\nNote: The provided information does not include Figure (b), so we cannot provide any specific details about it. # Main Topic: Solving Differential Equations with Separable Variables\n\n## Subtopic 1: Introduction\n- Differential equations with separable variables are the simplest type of first-order differential equations.\n- These equations can be solved by separating the variables and integrating.\n- It is important to have a good understanding of integration techniques before attempting to solve separable equations.\n\n## Subtopic 2: Definition of Separable Equation\n- A first-order differential equation of the form 𝑑𝑦/𝑑𝑥 = 𝑔(𝑥)ℎ(𝑦) is called a separable equation.\n- Separable equations have the property that the variables can be separated on opposite sides of the equation.\n- For example, the equation 𝑑𝑦/𝑑𝑥 = 𝑦^2𝑥𝑒^(3𝑥+4𝑦) is a separable equation, while 𝑑𝑦/𝑑𝑥 = 𝑦 + sin𝑥 is not separable.\n\n## Subtopic 3: Solving Separable Equations\n- To solve a separable equation, we can separate the variables by moving all terms involving 𝑦 to one side and all terms involving 𝑥 to the other side.\n- Once the variables are separated, we can integrate both sides of the equation.\n- The integration will involve finding antiderivatives or using integration techniques such as substitution or integration by parts.\n- After integrating, we can solve for 𝑦 in terms of 𝑥.\n\n## Subtopic 4: Example\n- Let's solve the separable equation 𝑑𝑦/𝑑𝑥 = 𝑦^2𝑥𝑒^(3𝑥+4𝑦) as an example.\n- We start by separating the variables: 𝑑𝑦/𝑦^2𝑒^(4𝑦) = 𝑥𝑒^(3𝑥)𝑑𝑥.\n- Next, we integrate both sides: ∫(1/𝑦^2𝑒^(4𝑦)) 𝑑𝑦 = ∫𝑥𝑒^(3𝑥) 𝑑𝑥.\n- The left side can be integrated using substitution, # Function of y\n\nThe function of y refers to the role or purpose that the variable y serves in a given equation or mathematical expression. It represents the dependent variable, meaning that its value is determined by the values of other variables in the equation.\n\n## Examples:\n\n1. In the equation y = 2x + 3, y represents the output or result of the equation. It depends on the value of x, which is the independent variable. By substituting different values for x, we can calculate the corresponding values of y.\n\n2. In the equation y = f(x), y represents the output of the function f when the input is x. The function f can be any mathematical expression or algorithm that relates x to y. By plugging in different values for x, we can determine the corresponding values of y.\n\n## Key Points:\n\n- The function of y is to represent the dependent variable in an equation or mathematical expression.\n- The value of y depends on the values of other variables in the equation.\n- By manipulating the values of other variables, we can determine the corresponding values of y.\n- In some cases, y may represent the output of a function when the input is x

This is just an example!!
PLease provide detailed subtopic in list and also if the provide text has any questions or examples or any exercise questions please solve that examples, questions and exercise step-by-step.Also provide the code if nessosory and code structure.
i am showing you some dummy picture:

## Key Concepts or Terminology    // make Suitable heading name here
Identify and define fundamental concepts crucial to understanding the text. Elaborate on their relevance and implications concerning the subject matter.Make Key concept as long as you can
1. Title:
     Description
   - Detailed explanation or analysis.
2. Title:
     Description
   - Detailed explanation or analysis.
3. Title:
     Description
   - Detailed explanation or analysis.
   (Please add more and more as identified of the important keyword or topic here)

## Key Term: Term Definition            // if nessosory
- **Explanation**: Describe the significance of the term in the current context.

## Sub-topic 1: Sub-topic Title
- **Overview**: Provide a brief summary about this sub-topic.

## Sub-topic 2: Sub-topic Title
- **Overview**: Provide a brief summary about this sub-topic.

## Detailed Analysis                // if nessosory
- For each important term or concept identified in the text, provide a detailed explanation, perhaps with bullet points for clarity.

## Key Points                // make Suitable heading name here
1. Title:
    Description
   - Detailed explanation or analysis.
2. Title:
     Description
   - Detailed explanation or analysis.
3. Title:
     Description
   - Detailed explanation or analysis.
   (Please add more and more as identified of the important keyword or topic here)

## Detailed Information        // make Suitable  heading name here
Provide subsections for each detailed topic, expanding on their significance with comprehensive explanations.If there are not then please not add this heading.

## Important Words          // if nessosory
- **Word 1**: Explanation of Word 1.
- **Word 2**: Description of Word 2.
- ...

## Sub-Topic 1
Explanation or details related to Sub-Topic 1.

## Sub-Topic 2
Explanation or details related to Sub-Topic 2.

## Questions and Answers                    // if nessosory
Note: Include this section only if there are explicit questions within the text.
1. **Question:** Extracted Question
   - **Answer:** Solution or explanation.
   (Please add more and more questions with answers as identified here)
   (solution will be step by step forexample if math then step by step calculations, if some programming logic or code)
   (also extract the question in the provide text and provide step by step solution)

## Examples                     // if nessosory
Note: Include this section only if examples are found within the text.
1. **Example 1:** Extracted Example
   - Solution or resolution of the example. //solution will be step by step
2. **Example 2:** Extracted Example
   - Solution or resolution of the example.  //solution will be step by step
   (Add more as required)
   (solution will be step by step forexample if math then step by step calculations, if some programming logic or code)
   (also extract the question in the provide text and provide step by step solution)

## Critical Developments or Arguments          // if nessosory
-Outline crucial developments or arguments present in the text, offering a concise yet thorough analysis.If there are not then please not add this heading.

### Detailed Analysis              // if nessosory
-Provide a deeper examination of specific topics or claims from the text, supported by factual evidence, theories, or interpretations.If there are not then please not add this heading.

## Data, Statistics, and Figures         // if nessosory
-Detail any significant data, statistics, or figures mentioned in the text, illustrating their importance within the context of the subject.If there are not then please not add this heading.

## Code Snippets or Technical Details        // if nessosory
-Incorporate relevant code snippets or technical descriptions, commenting on their functionality or significance where applicable.Please add more and more explanations of code structure of the given code or any example code you want to provide here if there is something like data stucture, Database, algorithum,or any programming languages.

## Case Studies or Real-World Examples         // if nessosory
-If available in the text, describe illustrative examples or case studies, emphasizing their relevance and outcomes.If there are not then please not ass this heading.

## Resources Compilation         // if nessosory
- Curated List of Books, Articles, Websites, and Media
- Annotations or Brief Descriptions for Each Resource

## Frequently Asked Questions          // if nessosory
-Compile common queries or specific questions naturally arising from the text, offering clear and concise responses.If there are not then please not ass this heading.

## Core Content             // if nessosory
_In-Depth Analysis and Discussion of Main Subject Matter_

## Comparative Analysis            // if nessosory
-Compare various viewpoints, models, or approaches within the text, discussing their contrasts and respective merits.

## Implications or Conclusions               // if nessosory
-Summarize potential implications derived from the information or draw conclusions arising from the analysis. Highlight any calls to action or future directions suggested by the text.

This is just a dummy picture you have to make accordingly the provided text context because everytime it not contain the same thing .thanks!!
Please provide the detailed of every important topic in the provided text make a topic details in a list and also if has any question then step by step solution.
and please do not add any discription of what you do like at the end of generating you day this text is bla bla dont add that just add the details more and more from the provided text if provided text has any important word or key point or event with less discription please and more detail in it.Thanks!
At the end please dont add this type of text:
Please Note: The provided text does not include specific questions, calculations, or code examples. Therefore, no step-by-step solutions, code structures, or technical details are included in the above output.If the something is not then dont say this is not so donot do......If you think that topic is nessosory then add it from your side with details.Dont make the heading of markdown just give me the markdow!!
Note:Please check the language of the provide document and and also reply in language in which the document is!
Please dont provide any note at the end!you are also making the markdown as heading on the start then giving markdown please dont add markdown as heading!!!
Provided Document:
${text}
`;
};
