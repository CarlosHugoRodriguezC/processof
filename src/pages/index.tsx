import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React from "react";

const HomePage: NextPage = () => {
  const users = api.users.getAll.useQuery({});

  return (
    <>
      {/* Hero section */}
      <section className="container mx-auto grid min-h-screen place-content-center py-5">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-10 text-center font-serif text-6xl uppercase">
            Take control of your production line
          </h1>
          <p className="text-center text-lg">
            Our web application helps you manage your production line from start
            to finish. With real-time updates and comprehensive reporting,
            you'll always know exactly what's happening at every stage of
            production.
          </p>
        </div>
      </section>
      {/* Features section */}
      <section className="container mx-auto grid min-h-screen place-content-center py-5">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-10 text-center font-serif text-4xl uppercase">
            Features
          </h1>
          <p className="mb-10 text-center">
            Our web application comes packed with features to help you
            streamline your production line and optimize your processes. Some of
            our key features include:
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Real-time updates</h2>
              <p>Real-time status updates for every stage of production</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Customizable workflows</h2>
              <p>Customizable workflows to fit your unique needs</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Easy collaboration</h2>
              <p>Easy collaboration tools for teams</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p>Comprehensive reporting and analytics</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Automated notifications</h2>
              <p>Automated notifications for important events</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">And more!</h2>
              <p>
                Sign up today to see all of the features our web application
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How it works section */}
      <section className="container mx-auto grid min-h-screen place-content-center py-5">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-10 text-center font-serif text-4xl uppercase">
            How it works
          </h1>
          <p className="mb-10 text-center">
            Our web application is designed to be easy to use and intuitive. To
            get started, simply sign up for an account and create a new
            production line. Then, add stages to your production line and
            customize the workflow for each stage. Finally, add users to your
            production line and assign them to stages. That's it! You're ready
            to start managing your production line.
          </p>
        </div>
      </section>

      {/* Testimonial sectiton */}
      <section className="container mx-auto grid min-h-screen place-content-center py-5">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-10 text-center font-serif text-4xl uppercase">
            Testimonials
          </h1>
          <p className="mb-10 text-center">
            Don't just take our word for it. Here's what some of our customers
            have to say about our web application:
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-2xl font-bold">Jane Doe</h2>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get started section */}
      <section className="container mx-auto grid min-h-screen place-content-center py-5">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-10 text-center font-serif text-4xl uppercase">
            Get started
          </h2>
          <p className="mb-10 text-center">
            Ready to get started? Sign up for an account today!
          </p>
          <div className="flex justify-center">
            <Button onClick={() => signIn()}>Sign up</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
