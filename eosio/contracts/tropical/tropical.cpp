#include <eosio/eosio.hpp>

using namespace eosio;

class[[eosio::contract("tropical")]] tropical : public eosio::contract {
    public:
        tropical(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds){}

        [[eosio::action]] void insert (name user, std::string new_message) {
            require_auth(user);
            message_index messages(get_self(), get_first_receiver().value);
            messages.emplace(user, [&](auto &row) {
                row.key = user;
                row.message = new_message;
            });
            print_f("You've sent a message, %!\n", user);
        }

    private:
        struct [[eosio::table]] message {
            name key;
            std::string message;
            uint64_t primary_key() const { return key.value;}
        };
        typedef eosio::multi_index<"messages"_n, message> message_index;
};
