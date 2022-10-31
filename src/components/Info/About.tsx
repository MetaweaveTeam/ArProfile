function About() {
  return(<>
    <h4>Permanent, decentralized, owned by you.</h4>
    <p>ArProfile is an Arweave native DID</p>
    <p>
      The underlying account protocol aims to satisfy essential needs for social interactions between users: an avatar, a unique @handle, a name and a bio. It also includes the possibility to add accounts from the well known social networks such as Twitter, Discord, Github, Instagram and Facebook.
    </p>
    <h4>Reusable Arweave component.</h4>
    
    <p>
      For developers, this app gives your users an access to edit their profile without the burden of creating a new UI in your project. And because it's a permanent app, you can be sure that the interaction with the protocol stays always the same, no painful update ahead.
    </p>
    <h4>Scalable.</h4>
    <p>
      Account is a simple native protocol on Arweave. It consists of a simple transaction containing the latest data state. A wallet key is attached to its own latest write with the tag Protocol-Name: 'Account-{'<version>'}'
    </p>
    <p>
      Therefore, Account is an universal protocol, scalable, and usable by all.
    </p>
    <p>
      Feel free to contribute <a href="https://github.com/MetaweaveTeam/Account" target="_blank" rel="noreferrer">here</a>.
    </p>
  </>);
}

export default About;